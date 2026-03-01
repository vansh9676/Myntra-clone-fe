import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 20;

// Get items
export const getRecentlyViewed = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error fetching recently viewed", error);
    return [];
  }
};

// Add item
export const addRecentlyViewed = async (product: any) => {
  try {
    let items = await getRecentlyViewed();

    // Remove duplicate
    items = items.filter((item: any) => item.id !== product.id);

    // Add newest at top
    const newItem = {
      ...product,
      viewedAt: Date.now(),
    };

    items.unshift(newItem);

    // Keep max 20
    items = items.slice(0, MAX_ITEMS);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.log("Error saving recently viewed", error);
  }
};