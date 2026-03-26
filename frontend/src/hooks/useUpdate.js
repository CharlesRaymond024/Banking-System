import api from "../api/axios"
import { useState } from "react";

const useUpdate = (url, token) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateData = async (payload) => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(url, payload, {
                signal: controller.signal,
                headers: {
                    Authorization: `Bearer ${token}`,
                },


            });
            setData(response.data);
        } catch (err) {
            setError(err.response.data);
        } finally {
            setLoading(false);
            controller.abort();
        }
    }

    return { data, loading, error, updateData };
}

export default useUpdate;