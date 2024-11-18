import React, { useState, createContext, useContext, PropsWithChildren } from "react";
import { IUser } from "../types";

interface IAuthContext {
    authToken: string,
    setAuthToken: (token: string) => void,
    authUser: IUser,
    setAuthUser: (user: IUser) => void,
    logout: () => void
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const localStorageAuth = localStorage.getItem("authToken");
  const localStorageUser = localStorage.getItem("authUser");
  const [authToken, setAuthToken] = useState(
    localStorageAuth ?? ""
  );
  const [authUser, setAuthUser] = useState(
    localStorageUser ? JSON.parse(localStorageUser) : null
  );

  const logout = () => {
    setAuthToken("");
    setAuthUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, authUser, setAuthUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext) as IAuthContext;

export { AuthProvider, useAuth };
