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
import AdminAccount from "./components/admin/AdminAccount";
import UserNotifications from "./components/notifications/UserNotifications";
import BankRevenue from "./components/SuperAdmin/BankRevenue";
import SingleBankRevenue from "./components/SuperAdmin/RevenueDetails";
import NotificationDetails from "./components/notifications/NotificationDetails";
import UpdateUser from "./components/SuperAdmin/UpdateUser";
import UpdateUserAccount from "./components/admin/UpdateUserAccount";
import AdminAccountDetails from "./components/admin/AdminAccountDetails";
import UpdateBank from "./components/SuperAdmin/UpdateBank";
import Unauthorized from "./components/auth/UnAuthorized";
import CustomerCare from "./components/SuperAdmin/CustomerCare";
import CreateCustomerCare from "./components/SuperAdmin/CreateCustomerCare";
import CustomerCareDetails from "./components/SuperAdmin/CustomerCareDetails";
import UpdateCustomerCare from "./components/SuperAdmin/UpdateCustomerCare";
import AllTransactions from "./components/SuperAdmin/SuperAdminTransaction";
import TransactionHistory from "./components/accounts/TransactionHistory";
import TransactionDetails from "./components/accounts/TransactionDetails";
import CustomerCareLayout from "./components/CustomerCare/CustomerCareLyout";
import CustomerCareDashBoard from "./components/CustomerCare/CustomerCareDashBoard";

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
            <Route path="/superadmin/support" element={<CustomerCare />} />
            <Route
              path="/superadmin/create-customer-care"
              element={<CreateCustomerCare />}
            />
            <Route
              path="/superadmin/customer-care/:id"
              element={<CustomerCareDetails />}
            />
            <Route
              path="/superadmin/customer-care/:id/update"
              element={<UpdateCustomerCare />}
            />
            <Route path="bank/:bank_id" element={<BanksDetails />} />
            <Route path="/superadmin/revenue" element={<BankRevenue />} />
            <Route
              path="/superadmin/revenue/:bank_id"
              element={<SingleBankRevenue />}
            />
            <Route
              path="/superadmin/users/update/:id"
              element={<UpdateUser />}
            />
            <Route
              path="/superadmin/bank/update/:id"
              element={<UpdateBank />}
            />
            <Route
              path="/superadmin/transactions"
              element={<AllTransactions />}
            />
          </Route>
          <Route path="/superadmin/myaccount" element={<MyAccountLayout />}>
            <Route index element={<MyAccountDashBoard />} />
            <Route path="details" element={<AccountDetails />} />
            <Route
              path="transactions/history"
              element={<TransactionHistory />}
            />
            <Route
              path="transactions/history/:id"
              element={<TransactionDetails />}
            />
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
            <Route path="/user/notifications" element={<UserNotifications />} />
            <Route
              path="/user/notifications/:notification_id"
              element={<NotificationDetails />}
            />
          </Route>

          <Route path="/user/myaccount" element={<MyAccountLayout />}>
            <Route index element={<MyAccountDashBoard />} />
            <Route path="details" element={<AccountDetails />} />
            <Route
              path="transactions/history"
              element={<TransactionHistory />}
            />
            <Route
              path="transactions/history/:id"
              element={<TransactionDetails />}
            />
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
            <Route path="/admin/accounts" element={<AdminAccount />} />
            <Route
              path="/admin/accounts/get/:id"
              element={<AdminAccountDetails />}
            />
            <Route
              path="/admin/accounts/update/:id"
              element={<UpdateUserAccount />}
            />
            <Route
              path="users/:userId/transactions"
              element={<AdminUserTransactions />}
            />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            {/*<Route path="/admin/accounts" element={<AdminAccounts />} /> */}
          </Route>
        </Route>
      </Route>

      <Route element={<PersistLogin />}>
        <Route path="/customercare" element={<CustomerCareLayout />}>
          <Route index element={<CustomerCareDashBoard />} />
          {/* <Route path="users" element={<CustomerCareUsers />} />
          <Route path="banks" element={<CustomerCareBanks />} />
          <Route path="reports" element={<CustomerCareReports />} />
          <Route path="settings" element={<CustomerCareSettings />} /> */}
        </Route>
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
