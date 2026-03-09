// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Layout from "./components/home/Layout";
import Login from "./components/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";
import SuperAdminDashboardLayout from "./components/SuperAdmin/SuperAdminDashBoarsLayout";
import SuperAdminDashboard from "./components/SuperAdmin/SuperAdminDashBoard";
import SuperAdminUsers from "./components/SuperAdmin/SuperAdminUser";
import SuperAdminUserDetails from "./components/SuperAdmin/SuperrAdminUserDetails";
import Page404 from "./components/auth/Page404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Super Admin Routes */}
      <Route element={<RequireAuth role="SuperAdmin" />}>
        <Route path="/superadmin" element={<SuperAdminDashboardLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          {/* Add more nested routes under /superadmin if needed */}
          <Route path="users" element={<SuperAdminUsers />} />
          <Route path="users/:id" element={<SuperAdminUserDetails />} />
        </Route>
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
