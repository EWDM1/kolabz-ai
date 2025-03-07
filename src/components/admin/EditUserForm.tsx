
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/components/admin/feature-management/types";

interface UserData {
  id: string;
  email: string;
  name: string;
  roles: string[];
  [key: string]: any;
}

interface EditUserFormProps {
  initialData: UserData;
}

export const EditUserForm = ({ initialData }: EditUserFormProps) => {
  const [formData, setFormData] = useState<UserData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const availableRoles: UserRole[] = ["user", "admin", "superadmin"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: UserRole, checked: boolean) => {
    setFormData(prev => {
      const updatedRoles = checked 
        ? [...prev.roles, role] 
        : prev.roles.filter(r => r !== role);
      
      return { ...prev, roles: updatedRoles };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Update user data in the users table
      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: formData.name,
          updated_at: new Date().toISOString()
        })
        .eq('id', formData.id);
      
      if (updateError) throw updateError;
      
      // Update user roles
      // First, delete all existing roles
      const { error: deleteRolesError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', formData.id);
      
      if (deleteRolesError) throw deleteRolesError;
      
      // Then insert new roles
      for (const role of formData.roles) {
        const { error: insertRoleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: formData.id,
            role: role as UserRole
          });
        
        if (insertRoleError) throw insertRoleError;
      }
      
      toast({
        title: "User updated",
        description: "The user has been successfully updated.",
      });
      
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating the user.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email (read-only)</Label>
            <Input 
              id="email" 
              name="email" 
              value={formData.email} 
              readOnly 
              disabled
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>User Roles</Label>
          <div className="space-y-2">
            {availableRoles.map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox 
                  id={`role-${role}`} 
                  checked={formData.roles.includes(role)} 
                  onCheckedChange={(checked) => 
                    handleRoleChange(role, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`role-${role}`}
                  className="capitalize"
                >
                  {role === "user" ? "Client" : role}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/users")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mr-2">Saving...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};
