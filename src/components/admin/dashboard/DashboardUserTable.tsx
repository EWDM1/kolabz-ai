
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/admin/UserTable";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AdminUser } from "@/components/admin/user-management/types";
import { UserRole } from "@/components/admin/feature-management/types";

interface DashboardUserTableProps {
  roleData: Array<{ name: string, value: number }>;
}

export function DashboardUserTable({ roleData }: DashboardUserTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();

  // Generate sample users based on role data
  const sampleUsers: AdminUser[] = roleData.flatMap((role, roleIndex) => 
    Array.from({ length: Math.min(role.value, 3) }, (_, i) => ({
      id: `sample-${roleIndex}-${i}`,
      name: `Sample ${role.name} ${i + 1}`,
      email: `${role.name.toLowerCase()}${i + 1}@example.com`,
      role: role.name.toLowerCase() as UserRole,
      status: i % 2 === 0 ? 'active' : 'inactive',
      lastActive: i % 2 === 0 ? 'Today' : '3 days ago'
    }))
  );

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <UserTable 
          users={sampleUsers}
          loading={false}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onEdit={(user) => {
            toast({
              title: "Edit User",
              description: `You selected to edit ${user.name}`,
            });
          }}
          onDelete={(user) => {
            toast({
              title: "Delete User",
              description: `You selected to delete user ID: ${user.id}`,
            });
          }}
        />
      </CardContent>
    </Card>
  );
}
