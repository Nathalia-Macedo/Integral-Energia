import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmailInput from '../Components/EmailInput';
import ResetPasswordForm from '../Components/ResetPasswordForm';
import logo from '../Assets/Integral Energia Logo.png';

export default function PasswordUpdate() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = (submittedEmail) => {
    setEmail(submittedEmail);
    setStep('resetPassword');
  };

  const handlePasswordReset = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex flex-col items-center justify-center">
          {/* <img
            src={logo}
            alt="Integral Energia Logo"
            className="mb-8 w-[280px] h-auto"
          /> */}
          <h3 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Redefinição de senha
          </h3>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'email'
              ? 'Digite seu email para receber o código de verificação'
              : 'Digite o código recebido e sua nova senha'}
          </p>
        </div>

        {step === 'email' ? (
          <EmailInput onEmailSubmit={handleEmailSubmit} />
        ) : (
          <ResetPasswordForm email={email} onPasswordReset={handlePasswordReset} />
        )}
      </motion.div>
    </div>
  );
}

