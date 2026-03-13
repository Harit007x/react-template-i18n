import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "@/layouts/admin-layout";

// Pages
import LoginPage from "@/pages/login/page";
import SignupPage from "@/pages/signup/page";
import ForgotPasswordPage from "@/pages/forgot-password/page";
import DashboardPage from "@/pages/admin/dashboard/page";
import AdminsPage from "@/pages/admin/admins/page";
import UsersPage from "@/pages/admin/users/page";
import CmsPagesPage from "@/pages/admin/cms-pages/page";
import FaqsPage from "@/pages/admin/faqs/page";
import InquiriesPage from "@/pages/admin/inquiries/page";
import SettingsPage from "@/pages/admin/settings/page";

export const router = createBrowserRouter([
  // Redirect root to login
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // Auth routes (no layout)
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },

  // Admin routes (with sidebar layout)
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "admins",
        element: <AdminsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "cms-pages",
        element: <CmsPagesPage />,
      },
      {
        path: "faqs",
        element: <FaqsPage />,
      },
      {
        path: "inquiries",
        element: <InquiriesPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
