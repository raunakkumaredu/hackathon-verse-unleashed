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

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  }
  function saveUsers(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
  }

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
      } catch {
        setAuthState({
          user: null,
          isLoading: false,
          error: null,
        });
        localStorage.removeItem("auth");
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setAuthState({ ...authState, isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      let users = getUsers();
      const existing = users.find((u: User) => u.email === email && u.role === role);
      if (existing) {
        setAuthState({
          ...authState,
          isLoading: false,
          error: "User with this email already exists",
        });
        toast.error("User with this email already exists");
        return false;
      }
      const user: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push({ ...user, password });
      saveUsers(users);
      setAuthState({
        user,
        isLoading: false,
        error: null,
      });
      localStorage.setItem("auth", JSON.stringify({ user }));
      toast.success(`Welcome ${name}! Your account has been created.`);
      return true;
    } catch {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "Registration failed",
      });
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setAuthState({ ...authState, isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const users = getUsers();
      const matched = users.find(
        (u: any) =>
          u.email === email && u.role === role && u.password === password
      );
      if (matched) {
        const { password, ...userRest } = matched;
        setAuthState({
          user: userRest,
          isLoading: false,
          error: null,
        });
        localStorage.setItem("auth", JSON.stringify({ user: userRest }));
        toast.success(`Welcome back, ${userRest.name}!`);
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
    } catch {
      setAuthState({
        user: null,
        isLoading: false,
        error: "Login failed",
      });
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (!authState.user) return;
    const updatedUser = {
      ...authState.user,
      ...userData,
      updatedAt: new Date(),
    };
    let users = getUsers();
    users = users.map((u: any) =>
      u.email === authState.user!.email && u.role === authState.user!.role
        ? { ...updatedUser, password: u.password }
        : u
    );
    saveUsers(users);
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
      isLoading: authState.isLoading,
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
