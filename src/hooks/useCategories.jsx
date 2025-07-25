import { useState, useEffect, useCallback } from "react";
import { getAllCategories } from "../services/DummyAPI";

export const useCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      setAllCategories(data);
    } catch (err) {
      setError(err);
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    allCategories,
    isLoading,
    error,
    setAllCategories,
    setIsLoading,
    selectedCategory,
    setSelectedCategory,
  };
};
