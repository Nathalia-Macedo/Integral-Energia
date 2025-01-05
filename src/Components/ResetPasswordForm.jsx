// import React, { useState, useEffect } from 'react';
// import { useApp } from '../Context/AppContext';
// const passwordRules = [
//   { regex: /.{8,}/, description: 'Pelo menos 8 caracteres' },
//   { regex: /[A-Z]/, description: 'Pelo menos uma letra maiúscula' },
//   { regex: /[a-z]/, description: 'Pelo menos uma letra minúscula' },
//   { regex: /[0-9]/, description: 'Pelo menos um número' },
//   { regex: /[^A-Za-z0-9]/, description: 'Pelo menos um caractere especial' },
// ];

// export default function ResetPasswordForm({ email, onPasswordReset }) {
//   const [resetCode, setResetCode] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [validRules, setValidRules] = useState([]);
//   const { resetPassword } = useApp();

//   useEffect(() => {
//     setValidRules(passwordRules.filter(rule => rule.regex.test(password)));
//   }, [password]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('As senhas não coincidem');
//       return;
//     }
//     if (validRules.length !== passwordRules.length) {
//       alert('A senha não atende a todos os requisitos');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await resetPassword(email, resetCode, password);
//       onPasswordReset();
//     } catch (error) {
//       console.error('Error resetting password:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
//           Código de verificação
//         </label>
//         <input
//           type="text"
//           id="resetCode"
//           value={resetCode}
//           onChange={(e) => setResetCode(e.target.value)}
//           required
//           maxLength={6}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//           placeholder="Digite o código de 6 dígitos"
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Nova senha
//         </label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//           placeholder="Digite a nova senha"
//         />
//       </div>
//       <div>
//         <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//           Confirmar nova senha
//         </label>
//         <input
//           type="password"
//           id="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//           placeholder="Confirme a nova senha"
//         />
//       </div>
//       <div className="space-y-2">
//         <p className="text-sm font-medium text-gray-700">Requisitos da senha:</p>
//         <ul className="text-sm space-y-1">
//           {passwordRules.map((rule, index) => (
//             <li
//               key={index}
//               className={`flex items-center space-x-2 ${
//                 validRules.includes(rule) ? 'text-green-600' : 'text-red-600'
//               }`}
//             >
//               <span>{validRules.includes(rule) ? '✓' : '×'}</span>
//               <span>{rule.description}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button
//         type="submit"
//         disabled={isLoading || validRules.length !== passwordRules.length || password !== confirmPassword}
//         className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
//           isLoading || validRules.length !== passwordRules.length || password !== confirmPassword
//             ? 'opacity-50 cursor-not-allowed'
//             : ''
//         }`}
//       >
//         {isLoading ? 'Redefinindo senha...' : 'Redefinir senha'}
//       </button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const passwordRules = [
  { regex: /.{8,}/, description: 'Pelo menos 8 caracteres' },
  { regex: /[A-Z]/, description: 'Pelo menos uma letra maiúscula' },
  { regex: /[a-z]/, description: 'Pelo menos uma letra minúscula' },
  { regex: /[0-9]/, description: 'Pelo menos um número' },
  { regex: /[^A-Za-z0-9]/, description: 'Pelo menos um caractere especial' },
];

export default function ResetPasswordForm({ email, onPasswordReset }) {
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onPasswordReset();
    } else {
      alert('As senhas não coincidem');
    }
  };

  const isPasswordValid = passwordRules.every(rule => rule.regex.test(password));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
          Código de verificação
        </label>
        <input
          type="text"
          id="resetCode"
          name="resetCode"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          placeholder="Digite o código de 6 dígitos"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Nova senha
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          placeholder="Digite sua nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirme a nova senha
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          placeholder="Confirme sua nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Requisitos da senha:</p>
        <ul className="text-xs space-y-1">
          {passwordRules.map((rule, index) => (
            <li
              key={index}
              className={`flex items-center ${
                rule.regex.test(password) ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span className="mr-2">
                {rule.regex.test(password) ? '✓' : '×'}
              </span>
              {rule.description}
            </li>
          ))}
        </ul>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={!isPasswordValid || password !== confirmPassword}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
        ${isPasswordValid && password === confirmPassword
          ? 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
          : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Redefinir senha
      </motion.button>
    </form>
  );
}

