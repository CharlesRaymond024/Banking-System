import useAuth from "../../hooks/useAuth";
import useRefresh from "../../hooks/useRefresh";
import LoadingGif from "../../assets/spinner.gif";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefresh();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefresh = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Only attempt refresh if persist is true and no token in memory
    if (persist && !auth?.accessToken) {
      verifyRefresh();
    } else {
      setLoading(false); // already have token or persist is off — render immediately
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!persist ? (
        <Outlet /> // no remember me — RequireAuth will redirect to login if needed
      ) : loading ? (
        <div className="flex justify-center py-10">
          <img src={LoadingGif} alt="Loading..." className="w-16 h-16" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
