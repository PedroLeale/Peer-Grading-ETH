import { createContext, useContext } from "react";

export interface AuthContextProps {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export interface User {
  username: string;
  token: string;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
