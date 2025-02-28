
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

// User roles
export type UserRole = "superadmin" | "admin" | "user";

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
  isSuperAdmin: boolean;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<boolean>;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to fetch user roles from the database
  const fetchUserRoles = async (userId: string): Promise<UserRole[]> => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error fetching user roles:", error);
      return ['user']; // Default to user role if error
    }
    
    return data?.map(item => item.role as UserRole) || ['user'];
  };

  // Function to fetch user profile data
  const fetchUserProfile = async (userId: string): Promise<{ name: string } | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('name')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    return data;
  };

  // Function to determine the highest role from a list of roles
  const getHighestRole = (roles: UserRole[]): UserRole => {
    if (roles.includes('superadmin')) return 'superadmin';
    if (roles.includes('admin')) return 'admin';
    return 'user';
  };

  // Initialize user session from Supabase
  useEffect(() => {
    const initializeUser = async () => {
      // Get the current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await updateUserState(session.user);
      }
      
      // Listen for auth changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            await updateUserState(session.user);
          } else {
            setUser(null);
          }
        }
      );
      
      setLoading(false);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeUser();
  }, []);

  // Update user state with data from Supabase
  const updateUserState = async (authUser: SupabaseUser) => {
    try {
      // Fetch user roles
      const roles = await fetchUserRoles(authUser.id);
      const highestRole = getHighestRole(roles);
      
      // Fetch user profile
      const profile = await fetchUserProfile(authUser.id);
      
      // Set user state
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        name: profile?.name || 'User',
        role: highestRole
      });
    } catch (error) {
      console.error("Error updating user state:", error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        return false;
      }
      
      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return true;
      }
      
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
    role: UserRole = "user"
  ): Promise<boolean> => {
    try {
      // Check if the current user is admin/superadmin (for creating users with specific roles)
      const isAdminCreating = user && (user.role === 'admin' || user.role === 'superadmin');
      
      // Register the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        return false;
      }
      
      // If an admin is creating a user with a specific role and it's different from the default 'user'
      if (isAdminCreating && role !== 'user' && data.user) {
        // The trigger will create the user and the 'user' role, now we need to add the additional role
        if (role === 'admin' || role === 'superadmin') {
          // Note: We let the trigger handle the basic user role
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({ user_id: data.user.id, role: role });
          
          if (roleError) {
            console.error("Error setting user role:", roleError);
            // Don't fail the registration, just log the error
          }
        }
        
        toast({
          title: "User created successfully",
          description: `${name} has been registered as a ${role}`,
        });
        
        return true;
      }
      
      // Normal user registration success message
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

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
    try {
      // First, check if the user already has this role
      const { data: existingRoles, error: fetchError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      if (fetchError) {
        console.error("Error checking existing roles:", fetchError);
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Could not check existing roles",
        });
        return false;
      }
      
      const userHasRole = existingRoles?.some(r => r.role === newRole);
      
      if (!userHasRole) {
        // Add the new role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });
        
        if (insertError) {
          console.error("Error adding role:", insertError);
          toast({
            variant: "destructive",
            title: "Update failed",
            description: "Could not add the new role",
          });
          return false;
        }
      }
      
      // If this is the current user, refresh their state
      if (user && user.id === userId) {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          await updateUserState(authUser);
        }
      }
      
      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}`,
      });
      
      return true;
    } catch (error) {
      console.error("Update role error:", error);
      toast({
        variant: "destructive",
        title: "Update error",
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout error",
        description: error.message,
      });
      return;
    }
    
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  // Computed property to check if user is admin or superadmin
  const isAdminUser = user?.role === "admin" || user?.role === "superadmin";
  
  // Check if user is a superadmin
  const isSuperAdminUser = user?.role === "superadmin";

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: isAdminUser,
        isSuperAdmin: isSuperAdminUser,
        register,
        updateUserRole,
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
