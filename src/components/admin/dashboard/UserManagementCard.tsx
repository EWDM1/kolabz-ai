
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/admin/UserTable";
import { useToast } from "@/hooks/use-toast";

interface UserManagementCardProps {
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
}

export const UserManagementCard = ({ selectedUsers, setSelectedUsers }: UserManagementCardProps) => {
  const { toast } = useToast();

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <UserTable 
          selectedUsers={selectedUsers} 
          setSelectedUsers={setSelectedUsers}
          onEdit={(user) => {
            toast({
              title: "Edit User",
              description: `You selected to edit ${user.name}`,
            });
          }}
          onDelete={(userId) => {
            toast({
              title: "Delete User",
              description: `You selected to delete user ID: ${userId}`,
            });
          }}
        />
      </CardContent>
    </Card>
  );
};
