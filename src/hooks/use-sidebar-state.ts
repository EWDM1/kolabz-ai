
import { useState, useEffect } from 'react';

export function useSidebarState() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check the sidebar collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  // Listen for storage events to sync sidebar state across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "adminSidebarCollapsed") {
        setSidebarCollapsed(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Function to toggle sidebar collapsed state
  const toggleSidebarCollapsed = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("adminSidebarCollapsed", String(newState));
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebarCollapsed
  };
}
