
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// User roles
export type UserRole = "admin" | "user" | "customer";

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<boolean>;
}

// Mock users database
const USERS_STORAGE_KEY = 'kolabz-users';
const CURRENT_USER_KEY = 'kolabz-current-user';

// Initial admin user
const initialAdmin = {
  id: "1",
  email: "eric@ewdigitalmarkeitng.com",
  name: "Eric",
  role: "admin" as UserRole,
  password: "Boludosteam1982!!"
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize users in localStorage if they don't exist
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!storedUsers) {
      // Store initial admin without exposing password in user object
      const initialUsers = [
        {
          id: initialAdmin.id,
          email: initialAdmin.email,
          name: initialAdmin.name,
          role: initialAdmin.role,
          password: initialAdmin.password
        }
      ];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }

    // Check if user is already logged in
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const matchedUser = users.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (matchedUser) {
          // Remove password before storing in state
          const { password, ...userWithoutPassword } = matchedUser;
          setUser(userWithoutPassword);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${matchedUser.name}!`,
          });
          
          return true;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole = "customer"
  ): Promise<boolean> => {
    try {
      // Get users from localStorage
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      let users = [];
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
        // Check if email already exists
        if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: "Email already exists",
          });
          return false;
        }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        role,
        password,
      };

      // Add user to users array
      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Automatically log in the new user if not an admin-created account
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration error",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
