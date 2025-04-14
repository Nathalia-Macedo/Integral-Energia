import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token && name) {
      setIsAuthenticated(true);
      setCurrentUser({ name });
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api-integral-energia.onrender.com/users');
      if (!response.ok) {
        throw new Error('Falha ao buscar usuários');
      }
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch('https://api-integral-energia.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao cadastrar usuário');
      }

      await updateUsersList();
      toast.success('Usuário cadastrado com sucesso!');
    } catch (error) {
      toast.error(`Erro ao cadastrar usuário: ${error.message}`);
      throw error;
    }
  };

  const updateUsersList = async () => {
    try {
      const response = await fetch('https://api-integral-energia.onrender.com/users');
      if (!response.ok) {
        throw new Error('Falha ao atualizar a lista de usuários');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao atualizar a lista de usuários:', error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('https://api-integral-energia.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao fazer login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name);
      setIsAuthenticated(true);
      setCurrentUser({ name: data.name });
      
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error(`Erro ao fazer login: ${error.message}`);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast.info('Logout realizado com sucesso');
  };

  const requestPasswordReset = async (email) => {
    try {
      const response = await fetch('https://api-integral-energia.onrender.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao solicitar redefinição de senha');
      }
  
      const data = await response.json();
      toast.success('Código de verificação enviado para o seu email');
      return data; // Retorna a resposta da API
    } catch (error) {
      toast.error(`Erro: ${error.message}`);
      throw error;
    }
  };
  


  const resetPassword = async (email, resetCode, newPassword) => {
    try {
      console.log('Dados enviados para redefinição:', { email, resetCode, newPassword });
  
      const response = await fetch('https://api-integral-energia.onrender.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetCode, newPassword }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao redefinir a senha');
      }
  
      toast.success('Senha redefinida com sucesso');
    } catch (error) {
      toast.error(`Erro: ${error.message}`);
      throw error;
    }
  };

  function retornarFormato(concessionaria, tipo) {
    console.log(`Concessionária: ${concessionaria}, tipo ${tipo}`)
    const formularios = {
        edp: {
            formulario_de_solicitacao_de_acesso: "pdf",
            lista_de_rateio: "xlsm",
            memorial_descritivo: "docx",
            termo_de_aceite: "xlsx"
        },
        neoenergia: {
            memorial_descritivo: "pdf"
        }
    };
    console.log(formularios[concessionaria][tipo])
    return formularios[concessionaria][tipo];
}


const processFile = async (file, targetForm, format) => {
  console.log(`modelo: ${targetForm}, formato: ${format}`)
    if (!file || !targetForm) {
      toast.error('Por favor, selecione um arquivo e um formulário de destino.');
      return null;
    }
  
    try {
      // Cria o FormData para enviar o arquivo e o formato
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);
  
      // Log para debug
      console.log('Arquivo:', file.name);
      console.log('Formato:', format);
      console.log('FormData entries:', Array.from(formData.entries()));
      console.log(targetForm)
      // Faz a requisição para o backend
      const response = await fetch(`https://integralenergia.onrender.com/gerar/${targetForm}/${format}`, {
        method: 'POST',
        body: formData,
      });

      console.log(response)
      console.log(`target form é ${targetForm} e format é ${format}`)
      // Verifica se a resposta é válida
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na resposta da API: ${errorText}`);
      }
  
      // Recebe o arquivo como Blob
      const blob = await response.blob();
  
      // Cria o link de download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download',`${targetForm}.${retornarFormato(format, targetForm)}`); // Nome do arquivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      // Exibe mensagem de sucesso
      toast.success(`Arquivo ${format.toUpperCase()} gerado com sucesso!`);
      return `Arquivo processado com sucesso no formato ${format.toUpperCase()}`;
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
      toast.error(`Erro ao processar o arquivo: ${error.message}`);
      throw error;
    }
  };

  const deleteUser = async (email) => {
    try {
      const response = await fetch(`https://api-integral-energia.onrender.com/delete-user?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao excluir usuário');
      }
  
      toast.success('Usuário excluído com sucesso!');
      await updateUsersList();
    } catch (error) {
      toast.error(`Erro ao excluir usuário: ${error.message}`);
      throw error;
    }
  };
  
  
  const value = {
    users,
    isLoading,
    error,
    currentUser,
    isAuthenticated,
    setCurrentUser,
    registerUser,
    updateUsersList,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    processFile,
    deleteUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
}

