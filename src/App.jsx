import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardPage from "./pages/dashboard";
import CampaignsPage from "./pages/dashboard/campaigns";
import NewCampaignPage from "./pages/dashboard/campaigns/new";
import MessagesPage from "./pages/dashboard/messages";
import AccountsPage from "./pages/dashboard/accounts";
import AnalyticsPage from "./pages/dashboard/analytics";
import SettingsPage from "./pages/dashboard/settings";
import UsersPage from "./pages/dashboard/users";
import PhoneNumberEntryPage from "./pages/PhoneNumberEntryPage";
import QRScannerPage from "./pages/QRScannerPage";
// import MessageLogs from "./pages/dashboard/logs"

function App() {
  // Simple auth check
  const isLoggedIn = !!localStorage.getItem("userId");

  if (!isLoggedIn) {
    // Always show login page if not logged in
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  // User is logged in, show full app
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="campaigns/new" element={<NewCampaignPage />} />
        <Route path="messages" element={<MessagesPage />} />
        {/* <Route path="logs" element={<MessageLogs />} /> */}
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
      <Route path="/connect" element={<PhoneNumberEntryPage />} />
      <Route path="/qr" element={<QRScannerPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;