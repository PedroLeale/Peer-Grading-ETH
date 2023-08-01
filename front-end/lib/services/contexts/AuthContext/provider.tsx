import React, { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type User, type AuthContextProps } from "./context";
import { useHandleToken } from "@/lib/utils/useHandleToken";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const { getToken, removeToken, setToken } = useHandleToken();

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = getToken();
    if (token) {
      // Validate the token or make an API request to validate it
      // If valid, set the user in the state
      //   setUser(userData);
    }
  }, []);

  // Define authentication functions
  const login = (token: string) => {
    // Save the token to local storage
    setToken(token);
    setLoggedIn(true);
    // Set the authenticated user in the state
    // const userData: User = { username: "example", token }; // Replace with actual user data
    // setUser(userData);
  };

  const logout = () => {
    // Clear the token from local storage
    removeToken();
    // Clear the authenticated user from the state
    setUser(null);
    setLoggedIn(false);
  };

  // Provide the context values to consuming components
  const authContextValues: AuthContextProps = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
