import React, { useState } from 'react';
import { useApp } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function EmailInput({ onEmailSubmit }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { requestPasswordReset } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      onEmailSubmit(email);
    } catch (error) {
      console.error('Error requesting password reset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-0 focus:border-transparent shadow-sm focus:shadow-md transition duration-300 ease-in-out"
          placeholder="Digite seu email"
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        />
      </div>
      <div className="space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Enviando...' : 'Enviar código de verificação'}
        </button>
        <button
          type="button"
          onClick={handleGoBack}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Voltar
        </button>
      </div>
    </form>
  );
}

