import React from 'react';
import { SignupForm } from './components/signup-form';

const SignupPage = () => {
	return (
		<div className="bg-white text-black min-h-screen flex flex-col items-center justify-center w-full p-4">
			<SignupForm />
		</div>
	);
};

export default SignupPage;