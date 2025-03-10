
import { useState, useEffect } from "react";

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

  // Listen for storage events to sync sidebar state across components
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      if (savedState !== null) {
        setSidebarCollapsed(savedState === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed
  };
}
