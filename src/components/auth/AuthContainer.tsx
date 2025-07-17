import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthContainerProps {
  onLoginSuccess: () => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ onLoginSuccess }) => {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  const handleShowRegister = () => {
    setCurrentView('register');
  };

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleRegisterSuccess = () => {
    // In a real app, you might want to show a success message
    // and then redirect to login or automatically log them in
    onLoginSuccess();
  };

  if (currentView === 'register') {
    return (
      <RegisterForm 
        onRegisterSuccess={handleRegisterSuccess}
        onBackToLogin={handleShowLogin}
      />
    );
  }

  return (
    <LoginForm 
      onLoginSuccess={onLoginSuccess}
      onShowRegister={handleShowRegister}
    />
  );
};

export default AuthContainer;