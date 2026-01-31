import React, { createContext, useContext, useState } from "react";

const DefaultContext = createContext();

export const useDefaultContext = () => useContext(DefaultContext);

export const DefaultProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const[sidebarDis, setSidebarDis] = useState(true)
  const [mainUser,setMainUser]= useState()

  return (
    <DefaultContext.Provider value={{ searchResults, setSearchResults , sidebarDis, setSidebarDis,mainUser,setMainUser}}>
      {children}
    </DefaultContext.Provider>
  );
};