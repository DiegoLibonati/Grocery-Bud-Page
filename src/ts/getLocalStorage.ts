import { Item } from "../vite-env";

export const getLocalStorage = (): Item[] => {
  return JSON.parse(localStorage.getItem("list")!)
    ? JSON.parse(localStorage.getItem("list")!)
    : [];
};
