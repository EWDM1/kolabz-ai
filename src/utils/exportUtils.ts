
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Export users data as JSON file
export const exportUsersAsJson = async () => {
  try {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (usersError) throw usersError;
    
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*');
    
    if (rolesError) throw rolesError;
    
    const exportData = users.map(user => {
      const userRoles = roles
        .filter(r => r.user_id === user.id)
        .map(r => r.role);
      
      return {
        ...user,
        roles: userRoles
      };
    });
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export complete",
      description: "Users data has been exported as JSON.",
    });
  } catch (error) {
    console.error("Error exporting users:", error);
    toast({
      variant: "destructive",
      title: "Export failed",
      description: "An error occurred while trying to export users data.",
    });
  }
};

// Export users data as CSV file
export const exportUsersAsCsv = async () => {
  try {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (usersError) throw usersError;
    
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*');
    
    if (rolesError) throw rolesError;
    
    // Process data for CSV format
    const exportData = users.map(user => {
      const userRoles = roles
        .filter(r => r.user_id === user.id)
        .map(r => r.role)
        .join(", ");
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        status: user.deleted ? "inactive" : "active",
        roles: userRoles,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
    });
    
    // Create CSV header
    const headers = Object.keys(exportData[0]);
    let csvContent = headers.join(",") + "\n";
    
    // Add data rows
    exportData.forEach(user => {
      const row = headers.map(header => {
        // Handle special characters and quotes in CSV
        const cellValue = user[header] === null ? '' : String(user[header]);
        return `"${cellValue.replace(/"/g, '""')}"`;
      });
      csvContent += row.join(",") + "\n";
    });
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export complete",
      description: "Users data has been exported as CSV.",
    });
  } catch (error) {
    console.error("Error exporting users as CSV:", error);
    toast({
      variant: "destructive",
      title: "Export failed",
      description: "An error occurred while trying to export users data as CSV.",
    });
  }
};
