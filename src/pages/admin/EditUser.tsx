
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { AdminUser } from "@/components/admin/UserTable";
import { toast } from "@/hooks/use-toast";

const EditUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the user data from location state or fetch it if not available
  const initialUserData = location.state?.user || {
    id: "",
    name: "",
    email: "",
    role: "user",
    status: "active"
  };
  
  const [userData, setUserData] = useState<AdminUser>(initialUserData);

  // Fetch user data if not provided in location state
  useEffect(() => {
    if (!location.state?.user && id) {
      // In a real application, this would fetch user data from an API
      console.log("Fetching user data for ID:", id);
      // Simulating API fetch with mock data
      // setUserData(mockUsers.find(user => user.id === id) || initialUserData);
    }
  }, [id, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real application, this would call an API to update the user
      console.log("Updating user:", userData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "User updated",
        description: `${userData.name || 'User'}'s information has been updated successfully.`,
      });
      
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was an error updating the user information.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Edit User"
      description="Update user information and permissions"
      bannerMessage="👋 Welcome back! Edit user information below."
    >
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center">
          <Link to="/admin/users">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Users
            </Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Make changes to the user's profile information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={userData.name || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={userData.email || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">User Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={userData.role || 'user'}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={userData.status || 'active'}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Reset Password (leave blank to keep current)</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New password"
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating User..." : "Update User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditUser;
