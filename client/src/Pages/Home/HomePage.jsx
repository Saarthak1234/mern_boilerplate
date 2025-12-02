import React from 'react';
import SplitText from '../../components/SplitText.jsx';
import ClickSpark from '@/components/ClickSpark/ClickSpark.jsx';

const HomePage = () => {
    return (
        <ClickSpark
            className="z-[9999]"
            sparkColor='#000000'
            sparkSize={10}
            sparkRadius={18}
            sparkCount={10}
            duration={300}>
            <div className="flex flex-col items-center justify-center min-h-screen">

                {/* First Line */}
                <div className="text-4xl font-bold mb-4 text-center">
                    <SplitText
                        text="Welcome to"
                        duration={1}
                        startDelay={0}      // Starts immediately
                        delay={50}          // 50ms stagger between words
                        splitType="words"
                        ease="power3.out"
                        // Fade in + slide up effect
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                </div>

                {/* Second Line */}
                <div className="text-4xl font-bold text-center">
                    <SplitText
                        text="MERN Boilerplate"
                        duration={1}
                        startDelay={0.15}    // Waits 1.1s (after first line finishes)
                        delay={50}          // 50ms stagger between words
                        splitType="words"
                        ease="power3.out"
                        // Fade in + slide up effect
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                </div>

            </div>
        </ClickSpark>
    );
};

export default HomePage;