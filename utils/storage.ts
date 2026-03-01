import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const setItem = async (key: string, value: string) => {
  if (isWeb) {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const getItem = async (key: string) => {
  if (isWeb) {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

export const removeItem = async (key: string) => {
  if (isWeb) {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

/* ✅ ADD THIS FUNCTION BACK */
export const getUserData = async () => {
  const _id = await getItem("userid");
  const name = await getItem("userName");
  const email = await getItem("userEmail");

  return { _id, name, email };
};