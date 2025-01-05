// import React, { useState, useRef, useEffect } from 'react';
// import { FiSettings, FiLogOut, FiLock, FiUserPlus, FiUser } from 'react-icons/fi';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import logo from '../Assets/Integral Energia Logo.png';
// import { useApp } from '../Context/AppContext';

// export default function Header() {
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const settingsRef = useRef(null);
//   const { currentUser, logout } = useApp();
//   const navigate = useNavigate();

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (settingsRef.current && !settingsRef.current.contains(event.target)) {
//         setIsSettingsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [settingsRef]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         <Link to="/">
//           <img
//             src={logo}
//             alt="Integral Energia Logo"
//             className="h-16 w-auto object-contain"
//           />
//         </Link>
//         <div className="flex items-center space-x-4">
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="flex items-center space-x-2"
//           >
//             <FiUser className="h-5 w-5 text-gray-600" />
//             <span className="text-gray-900 font-medium">
//               {currentUser ? currentUser.name : 'Usuário'}
//             </span>
//           </motion.div>
//           <div className="relative" ref={settingsRef}>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
//               aria-label="Configurações"
//               onClick={() => setIsSettingsOpen(!isSettingsOpen)}
//             >
//               <FiSettings className="h-6 w-6" />
//             </motion.button>
//             {isSettingsOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
//               >
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     console.log("Alterar senha");
//                     setIsSettingsOpen(false);
//                   }}
//                 >
//                   <FiLock className="inline mr-2" />
//                   Alterar senha
//                 </button>
//                 <Link
//                   to="/admin"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => setIsSettingsOpen(false)}
//                 >
//                   <FiUserPlus className="inline mr-2" />
//                   Tela de Administrador
//                 </Link>
//                 <Link
//                   to="/admin"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => setIsSettingsOpen(false)}
//                 >
//                   <FiUserPlus className="inline mr-2" />
//                   Cadastrar novo usuário
//                 </Link>
//               </motion.div>
//             )}
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
//             aria-label="Sair"
//             onClick={handleLogout}
//           >
//             <FiLogOut className="h-6 w-6" />
//           </motion.button>
//         </div>
//       </div>
//     </header>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { FiSettings, FiLogOut, FiLock, FiUserPlus, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../Assets/Integral Energia Logo.png';
import { useApp } from '../Context/AppContext';

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsRef]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Integral Energia Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <FiUser className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900 font-medium">
              {currentUser ? currentUser.name : 'Usuário'}
            </span>
          </motion.div>
          <div className="relative" ref={settingsRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              aria-label="Configurações"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <FiSettings className="h-6 w-6" />
            </motion.button>
            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <Link
                  to="/password-update"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <FiLock className="inline mr-2" />
                  Alterar senha
                </Link>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <FiUserPlus className="inline mr-2" />
                  Tela de Administrador
                </Link>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <FiUserPlus className="inline mr-2" />
                  Cadastrar novo usuário
                </Link>
              </motion.div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            aria-label="Sair"
            onClick={handleLogout}
          >
            <FiLogOut className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}

