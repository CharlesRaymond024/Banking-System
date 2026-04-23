import api from "../api/axios";
import { useState } from "react";

const useDelete = (url, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id = "") => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(
        id ? `${url}/${id}` : url,
        {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData };
};

export default useDelete;