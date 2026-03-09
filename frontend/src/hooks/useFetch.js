import api from "../api/axios";
import { useState, useEffect } from "react";

export function useFetch(url, token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(url, {
        signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (err) {
      if (err.name !== "CanceledError") {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    return () => controller.abort();
  }, [url, token]);

  return { data, loading, error, refetch: () => fetchData() };
}
