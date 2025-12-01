import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

// GitHub Strategy - Handles both login and signup
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ 
        $or: [
          { email: profile.emails?.[0]?.value },
          { githubId: profile.id }
        ]
      });
      
      if (user) {
        // User exists - Login flow
        return done(null, user);
      } else {
        // User doesn't exist - Signup flow
        user = new User({
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || `${profile.username}@github.local`,
          userName: profile.username,
          password: "oauth_github_user",
          isVerified: true,
          isAdmin: false,
          otp: "",
          githubId: profile.id,
        });
        await user.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

// Google Strategy - Handles both login and signup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ 
        $or: [
          { email: profile.emails?.[0]?.value },
          { googleId: profile.id }
        ]
      });
      
      if (user) {
        // User exists - Login flow
        return done(null, user);
      } else {
        // User doesn't exist - Signup flow
        user = new User({
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          userName: profile.emails?.[0]?.value.split('@')[0],
          password: "oauth_google_user",
          isVerified: true,
          isAdmin: false,
          otp: "",
          googleId: profile.id,
        });
        await user.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport; 