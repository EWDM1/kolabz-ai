
import { useState, useEffect } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable, AdminUser } from "@/components/admin/UserTable";
import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import EditUserForm from "@/components/admin/EditUserForm";
import { UserRole, useAuth } from "@/components/AuthContext";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  // Get users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('kolabz-users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        // Map to AdminUser format with additional fields
        const adminUsers: AdminUser[] = parsedUsers.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
          status: "active",
          lastLogin: "2023-07-15"
        }));
        setUsers(adminUsers);
      } catch (error) {
        console.error("Error parsing users:", error);
      }
    }
  }, []);

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser: AdminUser) => {
    // Update users array
    setUsers(prev => 
      prev.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    
    // Update localStorage (in a real app, this would be an API call)
    const storedUsers = localStorage.getItem('kolabz-users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        const updatedUsers = parsedUsers.map((user: any) => 
          user.id === updatedUser.id 
            ? { ...user, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role }
            : user
        );
        localStorage.setItem('kolabz-users', JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
    
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    // Don't allow deleting the initial admin
    if (userId === "1") {
      toast({
        variant: "destructive",
        title: "Cannot delete",
        description: "The primary administrator account cannot be deleted"
      });
      return;
    }
    
    // Remove from users array
    setUsers(prev => prev.filter(user => user.id !== userId));
    
    // Remove from localStorage (in a real app, this would be an API call)
    const storedUsers = localStorage.getItem('kolabz-users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        const updatedUsers = parsedUsers.filter((user: any) => user.id !== userId);
        localStorage.setItem('kolabz-users', JSON.stringify(updatedUsers));
        
        toast({
          title: "User deleted",
          description: "The user has been removed from the system"
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete user"
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Banner
          id="users-banner"
          message="👥 Manage all your users, roles and permissions in one place."
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">
                  Manage users and their access permissions
                </p>
              </div>
              
              <Link to="/admin/users/new">
                <Button>
                  <UserRoundPlus className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
              </Link>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  All registered users across your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserTable 
                  users={users} 
                  onEdit={handleEditUser} 
                  onDelete={handleDeleteUser} 
                />
              </CardContent>
            </Card>
            
            {isEditModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-lg">
                  <EditUserForm 
                    user={selectedUser} 
                    onSave={handleSaveUser} 
                    onCancel={() => {
                      setIsEditModalOpen(false);
                      setSelectedUser(null);
                    }} 
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
