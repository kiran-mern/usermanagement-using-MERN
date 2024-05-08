
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refresh,setRefresh]=useState(0)



  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const triggerRefresh = () => {
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  return (
    <UserContext.Provider value={{ user, refresh,setRefresh, logoutUser,triggerRefresh }}>
      {children}
    </UserContext.Provider>
  );
};
