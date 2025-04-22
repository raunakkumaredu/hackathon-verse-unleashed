
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, AuthState } from "@/types/auth";

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Check for saved auth on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuthState({
          user: parsedAuth.user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error parsing saved auth:", error);
        localStorage.removeItem("auth");
        setAuthState({
          user: null,
          isLoading: false,
          error: null,
        });
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  // Mock login function (in a real app, this would call an API)
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setAuthState({ ...authState, isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock validation (in a real app, this would be done by the server)
      if (email && password.length >= 6) {
        // Create a mock user
        const user: User = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          name: email.split('@')[0],
          email,
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        // Save to state and localStorage
        setAuthState({
          user,
          isLoading: false,
          error: null,
        });
        
        localStorage.setItem("auth", JSON.stringify({ user }));
        return true;
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          error: "Invalid credentials",
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: "Login failed",
      });
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem("auth");
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
  };
  
  return (
    <AuthContext.Provider value={{ 
      authState, 
      login, 
      logout, 
      isAuthenticated: !!authState.user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
