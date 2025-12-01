import React from 'react';
import { LoginForm } from './components/login-form';

const LoginPage = () => {
	return (
		<div className="bg-white text-black min-h-screen flex flex-col items-center justify-center w-full p-4">
			
            <LoginForm />
		</div>
	);
};

export default LoginPage;