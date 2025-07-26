import axios from "axios";

export const getProducts = async (numberOfProducts, paginationLimit = 0) => {
  try {
    const result = await axios.get(
      `https://dummyjson.com/products?limit=${numberOfProducts}&skip=${paginationLimit}&select=title,price,category,description,images,id`
    );
    return result.data.products;
  } catch (error) {
    console.log("Error in getting products ", error);
  }
};

export const getProductsWithSearch = async (
  numberOfProducts,
  paginationLimit = 0,
  searchTerm
) => {
  try {
    let result = await axios.get(
      `https://dummyjson.com/products/search?q=${searchTerm}&limit=${numberOfProducts}&skip=${paginationLimit}&select=title,price,category,description,images,id`
    );

    // Fixing problem when skip number > number of products in search
    if (result.data.products.length === 0) {
      try {
        result = await axios.get(
          `https://dummyjson.com/products/search?q=${searchTerm}&limit=${numberOfProducts}&select=title,price,category,description,images,id`
        );
      } catch (error) {
        console.log("Error second api call", error);
      }
    }
    return result.data.products;
  } catch (error) {
    console.log("Error in getting products ", error);
  }
};

export const getProductsWithId = async (id) => {
  try {
    const result = await axios.get(`https://dummyjson.com/products/${id}`);
    return result.data;
  } catch (error) {
    console.log("Error in getting products ", error);
  }
};

export const getProductsSuggestions = async (searchTerm) => {
  try {
    const result = await axios.get(
      `https://dummyjson.com/products/search?q=${searchTerm}&limit=4&select=title,id`
    );
    return result.data;
  } catch (error) {
    console.log("Error in getting products ", error);
  }
};

export const getAllCategories = async () => {
  try {
    const result = await axios.get(
      `https://dummyjson.com/products/category-list`
    );
    return result.data;
  } catch (error) {
    console.log("Error in getting products ", error);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const result = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return result.data;
  } catch (error) {
    console.log("Error in getting products ", error);
  }
};

export const getCategoryImages = async (allCategories) => {
  const images = {};
  for (const category of allCategories) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=1`
      );
      const data = await response.json();
      if (data.products && data.products[0]) {
        images[category] = data.products[0].thumbnail.replace(/["'"]/g, "%27");
      }
    } catch (error) {
      console.error(`Error fetching image for ${category}:`, error);
    }
  }
  return images;
};

export const tryLogin = async (username, password) => {
  try {
    const response = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "Login failed" };
    }
  } catch (error) {
    return {
      success: false,
      error: "Network error",
    };
  }
};
