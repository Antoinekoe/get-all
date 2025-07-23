import { useState, useEffect } from "react";
import { getAllCategories } from "../services/DummyAPI";

export const useCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getAllCategories();
        setAllCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { allCategories, isLoading, error, setAllCategories, setIsLoading };
};
