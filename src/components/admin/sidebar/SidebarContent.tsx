
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { SidebarItem } from "./SidebarItem";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarLogo } from "./SidebarLogo";
import { useSidebarCollapse } from "./useSidebarCollapse";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  Mail, 
  HelpCircle,
  Puzzle,
  Zap,
  CreditCard
} from "lucide-react";

interface SidebarContentProps {
  onClose?: () => void;
}

export const SidebarContent = ({ onClose }: SidebarContentProps) => {
  const location = useLocation();
  const { isCollapsed } = useSidebarCollapse();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    // Set the active item based on the current location
    const path = location.pathname;
    
    if (path.includes('/admin/user-management')) {
      setActiveItem('users');
    } else if (path.includes('/admin/analytics')) {
      setActiveItem('analytics');
    } else if (path.includes('/admin/email-manager')) {
      setActiveItem('emails');
    } else if (path.includes('/admin/integrations')) {
      setActiveItem('integrations');
    } else if (path.includes('/admin/help')) {
      setActiveItem('help');
    } else if (path.includes('/admin/feature-management')) {
      setActiveItem('features');
    } else if (path.includes('/admin/subscription-management')) {
      setActiveItem('subscriptions');
    } else if (path.includes('/admin/stripe-settings')) {
      setActiveItem('stripe-settings');
    } else {
      setActiveItem('dashboard');
    }
  }, [location]);
  
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none">
      <SidebarLogo collapsed={isCollapsed} />
      
      <div className="flex-1 py-4">
        <SidebarItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          to="/admin" 
          active={activeItem === 'dashboard'}
          collapsed={isCollapsed}
          onClick={onClose}
        />
        
        <SidebarItem 
          icon={<Users size={20} />} 
          label="User Management" 
          to="/admin/user-management" 
          active={activeItem === 'users'}
          collapsed={isCollapsed}
          onClick={onClose}
        />
        
        <SidebarItem 
          icon={<BarChart3 size={20} />} 
          label="Analytics" 
          to="/admin/analytics" 
          active={activeItem === 'analytics'}
          collapsed={isCollapsed}
          onClick={onClose}
        />
        
        <SidebarItem 
          icon={<Puzzle size={20} />} 
          label="Feature Management" 
          to="/admin/feature-management" 
          active={activeItem === 'features'}
          collapsed={isCollapsed}
          onClick={onClose}
        />
        
        <SidebarItem 
          icon={<CreditCard size={20} />} 
          label="Subscriptions" 
          to="/admin/subscription-management" 
          active={activeItem === 'subscriptions'}
          collapsed={isCollapsed}
          onClick={onClose}
        />
        
        <SidebarGroup 
          title="Settings" 
          collapsed={isCollapsed}
        >
          <SidebarItem 
            icon={<Mail size={20} />} 
            label="Email Templates" 
            to="/admin/email-manager" 
            active={activeItem === 'emails'}
            collapsed={isCollapsed}
            onClick={onClose}
          />
          
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Integrations" 
            to="/admin/integrations-settings" 
            active={activeItem === 'integrations'}
            collapsed={isCollapsed}
            onClick={onClose}
          />
          
          <SidebarItem 
            icon={<Zap size={20} />} 
            label="Stripe Settings" 
            to="/admin/stripe-settings" 
            active={activeItem === 'stripe-settings'}
            collapsed={isCollapsed}
            onClick={onClose}
          />
        </SidebarGroup>
        
        <SidebarItem 
          icon={<HelpCircle size={20} />} 
          label="Help & Support" 
          to="/admin/help" 
          active={activeItem === 'help'}
          collapsed={isCollapsed}
          onClick={onClose}
        />
      </div>
    </div>
  );
};
