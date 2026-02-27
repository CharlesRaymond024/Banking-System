import Header from "./Header";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />

      {/* pushes content below fixed header */}
      <main className="pt-20">
        <Outlet />
      </main>
     
    </>
  );
};

export default Layout;