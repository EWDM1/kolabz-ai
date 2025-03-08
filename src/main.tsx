
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import App from './App'
import './index.css'

// Pages
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyDashboard from './pages/MyDashboard'
import MyPrompts from './pages/MyPrompts'
import MySettings from './pages/MySettings'
import Checkout from './pages/Checkout'
import ManageSubscription from './pages/ManageSubscription'
import ChangePlan from './pages/ChangePlan'
import HelpSupport from './pages/HelpSupport'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import EditUser from './pages/admin/EditUser'
import FeatureManagement from './pages/admin/FeatureManagement'
import Analytics from './pages/admin/Analytics'
import EmailManager from './pages/admin/EmailManager'
import IntegrationsSettings from './pages/admin/IntegrationsSettings'
import StripeSettings from './pages/admin/StripeSettings'
import SubscriptionManagement from './pages/admin/SubscriptionManagement'
import Help from './pages/admin/Help'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'dashboard',
        element: <MyDashboard />,
      },
      {
        path: 'prompts',
        element: <MyPrompts />,
      },
      {
        path: 'settings',
        element: <MySettings />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'manage-subscription',
        element: <ManageSubscription />,
      },
      {
        path: 'change-plan',
        element: <ChangePlan />,
      },
      {
        path: 'help-support',
        element: <HelpSupport />,
      },
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
      {
        path: 'admin/user-management',
        element: <UserManagement />,
      },
      {
        path: 'admin/users/edit/:id',
        element: <EditUser />,
      },
      {
        path: 'admin/feature-management',
        element: <FeatureManagement />,
      },
      {
        path: 'admin/analytics',
        element: <Analytics />,
      },
      {
        path: 'admin/email-manager',
        element: <EmailManager />,
      },
      {
        path: 'admin/integrations-settings',
        element: <IntegrationsSettings />,
      },
      {
        path: 'admin/stripe-settings',
        element: <StripeSettings />,
      },
      {
        path: 'admin/subscription-management',
        element: <SubscriptionManagement />,
      },
      {
        path: 'admin/help',
        element: <Help />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
