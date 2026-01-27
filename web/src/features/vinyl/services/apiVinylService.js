import { BASE_URL } from "../../../app/config";

export const getVinylsByQuery = async ({
  query = "",
  minPrice,
  maxPrice,
  inStock,
  genre = "All",
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
    if (genre) params.append("genre", genre);
    if (page !== undefined) params.append("page", page);
    if (size !== undefined) params.append("size", size);
    if (sortByPrice) params.append("sortByPrice", sortByPrice);

    const response = await fetch(
      `${BASE_URL}/api/vinyl/search?${params.toString()}`,
    );

    if (!response.ok) {
      const error = new Error("Failed to fetch vinyls");
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/genre`);

    if (!response.ok) {
      const error = new Error("Failed to fetch genres");
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getVinylById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/vinyl/${id}`);

    if (!response.ok) {
      const error = new Error("Failed to fetch vinyl");
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLatestVinyls = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/vinyl/latest`);

    if (!response.ok) {
      const error = new Error("Failed to fetch latest vinyls");
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
