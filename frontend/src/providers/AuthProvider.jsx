import { createContext, useState, useEffect } from "react"; // ← add useEffect

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [persist, setPersist] = useState(
        () => JSON.parse(localStorage.getItem("persist")) || false
    )

    // Keep localStorage in sync whenever persist changes
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;