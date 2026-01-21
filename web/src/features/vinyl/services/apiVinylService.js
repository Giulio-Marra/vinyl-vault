export const getVinylsByQuery = async ({
  query = "",
  minPrice,
  maxPrice,
  inStock,
  page = 0,
  size = 8,
  sortByPrice = "asc",
}) => {
  try {
    const params = new URLSearchParams();

    params.append("query", query);
    if (minPrice !== undefined) params.append("minPrice", minPrice);
    if (maxPrice !== undefined) params.append("maxPrice", maxPrice);
    if (inStock !== undefined) params.append("inStock", inStock);
    if (page !== undefined) params.append("page", page);
    if (size !== undefined) params.append("size", size);
    if (sortByPrice) params.append("sortByPrice", sortByPrice);

    const response = await fetch(
      `http://localhost:3001/api/vinyl/search?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vinyls");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
