import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const login = (userName) => {
    setIsLoggedIn(true);
    setUserName(userName);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

