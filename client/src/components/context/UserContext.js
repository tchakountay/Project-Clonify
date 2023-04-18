import { createContext, useState, useEffect} from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() =>  {
    const storedData = sessionStorage.getItem('currentUser');
    const parsedData = storedData ? JSON.parse(storedData) : null;
    return parsedData || null;
  });

  useEffect(() => {
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);
  
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
