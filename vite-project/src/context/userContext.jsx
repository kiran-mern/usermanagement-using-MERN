
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refresh,setRefresh]=useState(0)
  const [searchInput,setSearchInput]=useState(null)



  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const triggerRefresh = () => {
    setRefresh((prevRefresh) => prevRefresh + 1);
  };
  const updateSearchInput = async(value) => {
    setSearchInput(value);
  };

  return (
    <UserContext.Provider value={{ user, refresh,setRefresh,triggerRefresh,searchInput,setSearchInput,updateSearchInput }}>
      {children}
    </UserContext.Provider>
  );
};
