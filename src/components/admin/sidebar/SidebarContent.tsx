
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  HelpCircle,
  Puzzle,
  Zap,
  CreditCard
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { SidebarGroup } from "./SidebarGroup";

export interface SidebarContentProps {
  onClose?: () => void;
  isCollapsed?: boolean;
}

export const SidebarContent = ({ onClose, isCollapsed = false }: SidebarContentProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    // Set the active item based on the current location
    const path = location.pathname;
    
    if (path.includes('/admin/user-management')) {
      setActiveItem('users');
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
    <div className="flex-1 py-4">
      <SidebarItem 
        icon={<LayoutDashboard size={20} />} 
        label="Dashboard" 
        href="/admin" 
        isActive={activeItem === 'dashboard'}
        isCollapsed={isCollapsed}
        onClick={onClose}
      />
      
      <SidebarItem 
        icon={<Users size={20} />} 
        label="User Management" 
        href="/admin/user-management" 
        isActive={activeItem === 'users'}
        isCollapsed={isCollapsed}
        onClick={onClose}
      />
      
      <SidebarItem 
        icon={<Puzzle size={20} />} 
        label="Feature Management" 
        href="/admin/feature-management" 
        isActive={activeItem === 'features'}
        isCollapsed={isCollapsed}
        onClick={onClose}
      />
      
      <SidebarItem 
        icon={<CreditCard size={20} />} 
        label="Subscriptions" 
        href="/admin/subscription-management" 
        isActive={activeItem === 'subscriptions'}
        isCollapsed={isCollapsed}
        onClick={onClose}
      />
      
      <SidebarGroup 
        icon={<Settings size={20} />}
        label="Settings" 
        isCollapsed={isCollapsed}
      >
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Integrations" 
          href="/admin/integrations-settings" 
          isActive={activeItem === 'integrations'}
          isCollapsed={isCollapsed}
          onClick={onClose}
        />
        
        <SidebarItem 
          icon={<Zap size={20} />} 
          label="Stripe Settings" 
          href="/admin/stripe-settings" 
          isActive={activeItem === 'stripe-settings'}
          isCollapsed={isCollapsed}
          onClick={onClose}
        />
      </SidebarGroup>
      
      <SidebarItem 
        icon={<HelpCircle size={20} />} 
        label="Help & Support" 
        href="/admin/help" 
        isActive={activeItem === 'help'}
        isCollapsed={isCollapsed}
        onClick={onClose}
      />
    </div>
  );
};
