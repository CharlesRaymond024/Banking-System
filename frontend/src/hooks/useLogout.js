import api from "../api/axios"
import useAuth from "./useAuth"

const useLogout = () => {
    const { setAuth, setPersist } = useAuth()

    const logout = async () => {
        try {
            await api.post("/auth/logout")
        } catch (err) {
            console.error("Logout error:", err)
        } finally {
            // Clear auth state and persist regardless of API response
            setAuth({})
            setPersist(false)
        }
    }

    return logout
}

export default useLogout