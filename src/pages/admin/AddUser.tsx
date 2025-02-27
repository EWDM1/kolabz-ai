
import { useState } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import AddUserForm from "@/components/admin/AddUserForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Banner
          id="add-user-banner"
          message="👤 Creating a new user with specific roles and permissions."
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Add New User</h1>
                <p className="text-muted-foreground">
                  Create a new user account with specific permissions
                </p>
              </div>
              
              <Link to="/admin/users">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Users
                </Button>
              </Link>
            </div>
            
            <AddUserForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUser;
