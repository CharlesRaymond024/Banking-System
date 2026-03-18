import api from "../api/axios"
import { useState, useEffect } from "react";

export function useFetch(url, token) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        try {
            setLoading(true);
            setError(null);

            const response = await api.get(url, {
                signal: signal,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setData(response.data)
        } catch (err) {
            setError(err.message)
        }finally {
            setLoading(false)
        }

        return () => controller.abort();
    }
    useEffect(() => {
      if (!url) return;
        fetchData();
    }, [url])

    return { data, loading, error };
}