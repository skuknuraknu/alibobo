import { useState,createContext } from "react";
export const UserContext = createContext({ nama:'', auth: false });

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [ user, setUser ] = useState({ nama: '', auth: false });

  // Login updates the user data with a name parameter
  const loginn = (nama) => {
    setUser((user) => ({
      nama: nama,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      nama: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginn, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider