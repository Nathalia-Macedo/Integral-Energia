import React, { useState, useRef, useEffect } from 'react';
import { FiSettings, FiLogOut, FiLock, FiUserPlus, FiUser, FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../Assets/Integral Energia Logo.png';
import { useApp } from '../Context/AppContext';

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const menuItems = [
    { icon: FiLock, text: 'Alterar senha', link: '/password-update' },
    { icon: FiUserPlus, text: 'Tela de Administrador', link: '/admin' },
    { icon: FiUserPlus, text: 'Cadastrar novo usuário', link: '/admin' },
  ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Integral Energia Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center  space-x-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center  space-x-2"
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
              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    {menuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition duration-150 ease-in-out"
                        onClick={() => setIsSettingsOpen(false)}
                      >
                        <item.icon className="inline mr-2" />
                        {item.text}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 py-2">
                  <FiUser className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-900 font-medium">
                    {currentUser ? currentUser.name : 'Usuário'}
                  </span>
                </div>
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="flex items-center space-x-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.text}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

