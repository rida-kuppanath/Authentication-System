import { createContext, useContext, useEffect, useState } from "react";
import {
  getUserByEmail,
  getUserById,
  getUserByUsername,
  createUser
} from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUsername = async (username) => {
    const users = await getUserByUsername(username);

    return users.length > 0;
  };

  const login = async (credentials) => {
    setIsLoading(true);

    try {
      const users = await getUserByEmail(credentials.email);

      if (users.length === 0) {
        throw new Error("Invalid email or password");
      }

      const foundUser = users[0];

      if (foundUser.password !== credentials.password) {
        throw new Error("Invalid email or password");
      }

      localStorage.setItem("userId", foundUser.id);

      setUser(foundUser);

      return foundUser;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);

    try {
      const usernameExists = await checkUsername(userData.username);

      if (usernameExists) {
        throw new Error("Username already exists");
      }

      const newUser = await createUser(userData);

      localStorage.setItem("userId", newUser.id);

      setUser(newUser);

      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const fetchCurrentUser = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await getUserById(userId);

      setUser(currentUser);
    } catch (error) {
      localStorage.removeItem("userId");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        fetchCurrentUser,
        checkUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};