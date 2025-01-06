import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiSearch, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { useApp } from '../Context/AppContext';
import UserRegistrationForm from '../Components/UseRegistrationForm';
import { motion } from 'framer-motion';

export default function AdminScreen() {
  const { users, isLoading, error, currentUser, updateUsersList } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    updateUsersList();
  }, [updateUsersList]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  if (isLoading) {
    return (
      <>
        <Header userName={currentUser?.name} />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header userName={currentUser?.name} />
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erro: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header userName={currentUser?.name} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Painel de Administração</h1>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FiArrowLeft className="mr-2" /> Voltar para Tela Principal
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4 bg-green-600">
              <h2 className="text-xl font-semibold text-white">Usuários Registrados</h2>
            </div>
            <div className="p-6">
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <ul className="divide-y divide-gray-200 max-h-[calc(100vh-400px)] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <motion.li 
                    key={user.id} 
                    className="py-4 flex items-center hover:bg-gray-50 transition duration-150 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FiUser className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FiMail className="mr-1" /> {user.email}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">ID: {user.id.slice(-4)}</div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4 bg-green-600">
              <h2 className="text-xl font-semibold text-white">Cadastrar Novo Usuário</h2>
            </div>
            <div className="p-6">
              <UserRegistrationForm onSuccess={updateUsersList} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

