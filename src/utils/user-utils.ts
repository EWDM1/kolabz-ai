
import { AdminUser } from "@/components/admin/user-management/types";
import { UserRole } from "@/components/admin/feature-management/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Format the last login time based on how recent it was
 */
export const formatLastActive = (lastSignInAt: string | undefined): string => {
  if (!lastSignInAt) return 'Never';
  
  const lastSignIn = new Date(lastSignInAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastSignIn.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) {
    return `Today, ${lastSignIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays === 1) {
    return `Yesterday, ${lastSignIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return lastSignIn.toLocaleDateString();
  }
};

/**
 * Determine the highest role from an array of roles
 */
export const getHighestRole = (roles: UserRole[]): UserRole => {
  if (roles.includes('superadmin')) return 'superadmin';
  if (roles.includes('admin')) return 'admin';
  return 'user';
};

/**
 * Check if a user can delete another user based on roles
 */
export const canDeleteUser = async (currentUserId: string, targetUserId: string): Promise<boolean> => {
  // Get current user's role
  const { data: currentUserRoles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', currentUserId);
    
  const isSuperAdmin = currentUserRoles?.some(r => r.role === 'superadmin');
  
  // Get target user's role
  const { data: targetUserRoles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', targetUserId);
    
  const isTargetSuperAdmin = targetUserRoles?.some(r => r.role === 'superadmin');
  
  // Only superadmins can delete other superadmins
  if (isTargetSuperAdmin && !isSuperAdmin) {
    return false;
  }
  
  return true;
};
