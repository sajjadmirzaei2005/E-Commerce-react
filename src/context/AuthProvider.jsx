import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);


  const login = (email, password) => {

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {

      setUser(existingUser);
      localStorage.setItem('user', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };


  const register = (email, password) => {

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some((u) => u.email === email);

    if (userExists) return false;

    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };


  const logout = () => {

    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {

    user,
    login,
    register,
    logout,
  };

  return (

    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}