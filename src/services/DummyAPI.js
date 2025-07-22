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
