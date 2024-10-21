import React, { useState } from 'react';
import Register from '../registerPage/register';
import Login from '../LoginPage/Login';

const AuthFlow = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleRegistrationSuccess = () => {
    setShowLogin(true);
  };

  return (
    <div>
      {!showLogin ? (
        <Register onRegistrationSuccess={handleRegistrationSuccess} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default AuthFlow;