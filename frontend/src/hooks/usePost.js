import api from "../api/axios";
import { useState } from "react";

const usePost = (url, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (payload) => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await api.post(url, payload, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
      return response.data; // useful when calling the hook
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  return { data, loading, error, postData };
};

export default usePost;
