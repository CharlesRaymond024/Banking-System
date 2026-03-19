// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Layout from "./components/home/Layout";
import Login from "./components/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";
import SuperAdminDashboardLayout from "./components/SuperAdmin/SuperAdminDashBoardLayout";
import SuperAdminDashboard from "./components/SuperAdmin/SuperAdminDashBoard";
import SuperAdminUsers from "./components/SuperAdmin/SuperAdminUser";
import SuperAdminUserDetails from "./components/SuperAdmin/SuperrAdminUserDetails";
import MyAccountLayout from "./components/accounts/MyAccountLayout";
import MyAccountDashBoard from "./components/accounts/MyAccountDashBoard";
import AccountDetails from "./components/accounts/AccountDetails";
import CreateUserandAccount from "./components/SuperAdmin/CreateUserandAccount";
import UserDashBoard from "./components/user/UserDashBoard";
import UserLayout from "./components/user/UserLayout";
import UserTransactions from "./components/user/Transactions";
import Transfer from "./components/accounts/Transfer";
import AdminDetails from "./components/SuperAdmin/AdminDetails";
import AdminPage from "./components/SuperAdmin/AdminPage";
import CreateAdmin from "./components/SuperAdmin/CreateAdmin";
import Page404 from "./components/auth/Page404";
import Bank from "./components/SuperAdmin/Banks";
import PersistLogin from "./components/auth/Persist";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminUsers from "./components/admin/AdminUsers";
import AdminUserTransactions from "./components/admin/AdminUserTransaction";
import AdminTransactions from "./components/admin/AdminTransactions";
import BanksDetails from "./components/SuperAdmin/BanksDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Super Admin Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth role="SuperAdmin" />}>
          <Route path="/superadmin" element={<SuperAdminDashboardLayout />}>
            <Route index element={<SuperAdminDashboard />} />
            {/* Add more nested routes under /superadmin if needed */}
            <Route path="users" element={<SuperAdminUsers />} />
            <Route path="users/:id" element={<SuperAdminUserDetails />} />
            <Route
              path="CreateUserandAccount"
              element={<CreateUserandAccount />}
            />
            <Route path="/superadmin/admins" element={<AdminPage />} />
            <Route path="/superadmin/admins/:id" element={<AdminDetails />} />
            <Route path="/superadmin/create-admin" element={<CreateAdmin />} />
            <Route path="/superadmin/bank" element={<Bank />} />
            <Route path="bank/:bank_id" element={<BanksDetails />} />
          </Route>
          <Route path="/superadmin/myaccount" element={<MyAccountLayout />}>
            <Route index element={<MyAccountDashBoard />} />
            <Route path="details" element={<AccountDetails />} />
            <Route path="transfer" element={<Transfer />} />
          </Route>
        </Route>
      </Route>

      {/* User Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth role="User" />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserDashBoard />} />
            {/* Add more nested routes under /user if needed */}
            <Route path="/user/transactions" element={<UserTransactions />} />
          </Route>

          <Route path="/user/myaccount" element={<MyAccountLayout />}>
            <Route index element={<MyAccountDashBoard />} />
            <Route path="details" element={<AccountDetails />} />
            <Route path="transfer" element={<Transfer />} />
          </Route>
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth role="Admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route
              path="users/:userId/transactions"
              element={<AdminUserTransactions />}
            />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            {/*<Route path="/admin/accounts" element={<AdminAccounts />} /> */}
          </Route>
        </Route>
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
