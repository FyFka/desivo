import { invoke, InvokeArgs } from "@tauri-apps/api/tauri";

type AppStorageKeys = "cached_token";

export const getFromAppStorage = async <T>(key: AppStorageKeys): Promise<T> => {
  const value = await invoke(`get_${key}`);
  console.log(value);
  return value as T;
};

export const setToAppStorage = async <T>(key: AppStorageKeys, value: InvokeArgs): Promise<T> => {
  const result = await invoke(`set_${key}`, value);
  return result as T;
};
