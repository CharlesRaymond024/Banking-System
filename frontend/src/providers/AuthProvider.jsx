import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const [persist, setPersist] = useState(() => {
    return JSON.parse(localStorage.getItem("persist")) || false;
  });

  // Save persist toggle
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  // 🔥 HYDRATE AUTH ON APP LOAD (KEY FIX)
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth && persist) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [persist]);

  // 🔥 SAVE AUTH ONLY WHEN PERSIST IS ON
  useEffect(() => {
    if (persist && auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth, persist]);

  // logout helper (optional but recommended)
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
