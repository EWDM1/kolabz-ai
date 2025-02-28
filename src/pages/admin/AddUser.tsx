
import AdminLayout from "@/components/admin/AdminLayout";
import AddUserForm from "@/components/admin/AddUserForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const AddUser = () => {
  return (
    <AdminLayout
      title="Add New User"
      description="Create a new user account"
      bannerMessage="👋 Welcome back! Create a new user account below."
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
        
        <AddUserForm />
      </div>
    </AdminLayout>
  );
};

export default AddUser;
