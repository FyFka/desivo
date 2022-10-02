import { invoke } from "@tauri-apps/api/tauri";

type AppStorageKeys = "cached_token";

export const getFromAppStorage = async (key: AppStorageKeys) => {
  const value = await invoke(`get_${key}`);
  return value;
};

export const setToAppStorage = async <T>(key: AppStorageKeys, value: T) => {
  const result = await invoke(`set_${key}`, { value });
  return result;
};
