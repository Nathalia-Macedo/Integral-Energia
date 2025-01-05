import React, { useEffect } from 'react';
import { FiUser, FiMail } from 'react-icons/fi';
import Header from '../Components/Header';
import { useApp } from '../Context/AppContext';
import UserRegistrationForm from '../Components/UseRegistrationForm';
export default function AdminScreen() {
  const { users, isLoading, error, currentUser, updateUsersList } = useApp();
    console.log(currentUser)
  useEffect(() => {
    updateUsersList();
  }, [updateUsersList]);

  if (isLoading) {
    return (
      <>
        <Header userName={currentUser.name} />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header userName={currentUser.name} />
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
      <Header userName={currentUser.name} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-green-600">
              <h2 className="text-xl font-semibold text-white">Usuários Registrados</h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.id} className="py-4 flex items-center">
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
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-green-600">
              <h2 className="text-xl font-semibold text-white">Cadastrar Novo Usuário</h2>
            </div>
            <div className="p-6">
              <UserRegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

