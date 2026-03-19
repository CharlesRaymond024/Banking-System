import api from "../api/axios"
import useAuth from "./useAuth"

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await api.get("/auth/refresh")

        const { accessToken, user } = response.data

        setAuth(prev => ({
            ...prev,
            accessToken,
            user,
            role: user.roles, // ← now matches Login.jsx shape exactly
        }))

        return accessToken
    }

    return refresh
}

export default useRefresh