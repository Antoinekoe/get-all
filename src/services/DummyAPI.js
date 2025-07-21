import axios from "axios";

export const getProducts = async (numberOfProducts, paginationLimit = 0) => {
  try {
    const result = await axios.get(
      `https://dummyjson.com/products?limit=${numberOfProducts}&skip=${paginationLimit}&select=title,price,category,description,images`
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
      `https://dummyjson.com/products/search?q=${searchTerm}&limit=${numberOfProducts}&skip=${paginationLimit}`
    );

    // Fixing problem when skip number > number of products in search
    if (result.data.products.length === 0) {
      try {
        result = await axios.get(
          `https://dummyjson.com/products/search?q=${searchTerm}&limit=${numberOfProducts}`
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
