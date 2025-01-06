// import React, { useState, useEffect } from 'react';
// import { FiUser, FiMail, FiSearch, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import Header from '../Components/Header';
// import { useApp } from '../Context/AppContext';
// import UserRegistrationForm from '../Components/UseRegistrationForm';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function AdminScreen() {
//   const { users, isLoading, error, currentUser, updateUsersList, deleteUser } = useApp();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   useEffect(() => {
//     updateUsersList();
//   }, [updateUsersList]);

//   useEffect(() => {
//     setFilteredUsers(
//       users.filter((user) =>
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [users, searchTerm]);

//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (userToDelete) {
//       await deleteUser(userToDelete.email);
//       setDeleteModalOpen(false);
//       setUserToDelete(null);
//       updateUsersList();
//     }
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Header userName={currentUser?.name} />
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header userName={currentUser?.name} />
//         <div className="flex justify-center items-center h-screen">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <strong className="font-bold">Erro: </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header userName={currentUser?.name} />
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Painel de Administração</h1>
//           <Link
//             to="/"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             <FiArrowLeft className="mr-2" /> Voltar para Tela Principal
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white shadow-lg rounded-lg overflow-hidden"
//           >
//             <div className="px-6 py-4 bg-green-600">
//               <h2 className="text-xl font-semibold text-white">Usuários Registrados</h2>
//             </div>
//             <div className="p-6">
//               <div className="mb-4 relative">
//                 <input
//                   type="text"
//                   placeholder="Buscar usuários..."
//                   className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <FiSearch className="absolute left-3 top-3 text-gray-400" />
//               </div>
//               <ul className="divide-y divide-gray-200 max-h-[calc(100vh-400px)] overflow-y-auto">
//                 {filteredUsers.map((user) => (
//                   <motion.li 
//                     key={user.id} 
//                     className="py-4 flex items-center hover:bg-gray-50 transition duration-150 ease-in-out"
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     <div className="flex-shrink-0">
//                       <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
//                         <FiUser className="h-6 w-6 text-green-600" />
//                       </div>
//                     </div>
//                     <div className="ml-3 flex-1">
//                       <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                       <p className="text-sm text-gray-500 flex items-center">
//                         <FiMail className="mr-1" /> {user.email}
//                       </p>
//                     </div>
//                     <div className="text-sm text-gray-500 mr-4">ID: {user.id.slice(-4)}</div>
//                     <button
//                       onClick={() => handleDeleteClick(user)}
//                       className="text-red-600 hover:text-red-800 transition-colors duration-200"
//                     >
//                       <FiTrash2 className="h-5 w-5" />
//                     </button>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           </motion.div>
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white shadow-lg rounded-lg overflow-hidden"
//           >
//             <div className="px-6 py-4 bg-green-600">
//               <h2 className="text-xl font-semibold text-white">Cadastrar Novo Usuário</h2>
//             </div>
//             <div className="p-6">
//               <UserRegistrationForm onSuccess={updateUsersList} />
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {deleteModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.95 }}
//               className="bg-white rounded-lg p-6 max-w-sm w-full"
//             >
//               <h3 className="text-lg font-medium mb-4">Confirmar exclusão</h3>
//               <p className="mb-4">Tem certeza que deseja excluir o usuário {userToDelete?.name}?</p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setDeleteModalOpen(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 >
//                   Cancelar
//                 </button>
//                 <button
//                   onClick={handleConfirmDelete}
//                   className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   Confirmar
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiSearch, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { useApp } from '../Context/AppContext';
import UserRegistrationForm from '../Components/UseRegistrationForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminScreen() {
  const { users, isLoading, error, currentUser, updateUsersList, deleteUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.email);
        setDeleteModalOpen(false);
        setUserToDelete(null);
        updateUsersList();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

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
                    <div className="text-sm text-gray-500 mr-4">ID: {user.id.slice(-4)}</div>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
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

      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-medium mb-4">Confirmar exclusão</h3>
              <p className="mb-4">Tem certeza que deseja excluir o usuário {userToDelete?.name}?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

