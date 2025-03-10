import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import Settings from "@/pages/Settings";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import DatasetPage from "@/pages/DatasetPage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      // Redirect to login page and pass the current URL as a state
      navigate("/login", { state: { returnUrl: location.pathname } });
    }
  }, [user, navigate, location]);

  return user ? children : null;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  return isAdmin ? children : null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
  {
    path: "/datasets",
    element: <DatasetPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <ScrollToTop />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
