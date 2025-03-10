
import { FeatureManagement } from "@/components/admin/FeatureManagement";
import AdminLayout from "@/components/admin/AdminLayout";

const FeatureManagementPage = () => {
  return (
    <AdminLayout 
      title="Feature Management"
      description="Control which features are accessible to each user role"
      bannerMessage="👋 Welcome back! Manage feature access for different user roles."
    >
      <FeatureManagement />
    </AdminLayout>
  );
};

export default FeatureManagementPage;
