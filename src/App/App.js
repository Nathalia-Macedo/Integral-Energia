import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../Context/AppContext';
import Dashboard from '../Pages/MainScreen';
import AdminScreen from '../Pages/AdminScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from '../Pages/Login';
import PasswordUpdate from '../Pages/PasswordUpdate';
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/password-update" element={<PasswordUpdate />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

