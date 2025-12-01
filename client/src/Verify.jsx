import React from 'react';
import { OTPForm } from './components/otp-form';

const VerifyPage = () => {
	return (
		<div className="bg-white text-black min-h-screen flex flex-col items-center justify-center w-full p-4">
			<OTPForm />
		</div>
	);
};

export default VerifyPage;