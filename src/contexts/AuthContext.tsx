
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, AuthState } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUserProfile: (userData: Partial<User>) => void;
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

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setAuthState({ ...authState, isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        if (parsedAuth.user && parsedAuth.user.email === email) {
          setAuthState({
            ...authState,
            isLoading: false,
            error: "User with this email already exists",
          });
          toast.error("User with this email already exists");
          return false;
        }
      }
      
      // Create a new user
      const user: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name,
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
      toast.success(`Welcome ${name}! Your account has been created.`);
      return true;
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "Registration failed",
      });
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

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
        toast.success(`Welcome back, ${user.name}!`);
        return true;
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          error: "Invalid credentials",
        });
        toast.error("Invalid credentials. Please check your email and password.");
        return false;
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: "Login failed",
      });
      toast.error("Login failed. Please try again.");
      return false;
    }
  };
  
  // Update user profile information
  const updateUserProfile = (userData: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = {
      ...authState.user,
      ...userData,
      updatedAt: new Date(),
    };
    
    setAuthState({
      ...authState,
      user: updatedUser,
    });
    
    localStorage.setItem("auth", JSON.stringify({ user: updatedUser }));
    toast.success("Profile updated successfully!");
  };
  
  const logout = () => {
    localStorage.removeItem("auth");
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
    toast.info("You have been logged out.");
  };
  
  return (
    <AuthContext.Provider value={{ 
      authState, 
      login,
      register,
      logout,
      updateUserProfile,
      isAuthenticated: !!authState.user,
      isLoading: authState.isLoading
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
