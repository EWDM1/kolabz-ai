
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { UserRole } from "@/components/admin/feature-management/types";

// Define types for our context
export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData.session?.user) {
          // Fetch user details and roles from our database
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();
            
          const { data: rolesData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', sessionData.session.user.id);
            
          // Find the highest role (superadmin > admin > user)
          let highestRole: UserRole = 'user';
          if (rolesData?.some(r => r.role === 'superadmin')) {
            highestRole = 'superadmin';
          } else if (rolesData?.some(r => r.role === 'admin')) {
            highestRole = 'admin';
          }
          
          setUser({
            ...userData,
            role: highestRole
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Fetch user details and roles from our database
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          const { data: rolesData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id);
            
          // Find the highest role (superadmin > admin > user)
          let highestRole: UserRole = 'user';
          if (rolesData?.some(r => r.role === 'superadmin')) {
            highestRole = 'superadmin';
          } else if (rolesData?.some(r => r.role === 'admin')) {
            highestRole = 'admin';
          }
          
          setUser({
            ...userData,
            role: highestRole
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Login error:", error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) {
        console.error("Registration error:", error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  // Check if user has admin access
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Redirect to AdminDashboard for SuperAdmin users
export const useRedirectForSuperAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'superadmin') {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);
};
