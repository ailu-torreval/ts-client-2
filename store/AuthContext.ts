import React from 'react';

export const AuthContext = React.createContext({
  isLogged: false,
  setIsLogged: (value: boolean) => {},
  isAdmin: false,
  setIsAdmin: (value: boolean) => {},
});