import { Item } from "@src/entities/vite-env";

import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { LOCAL_STORAGE_ITEMS_KEY } from "@src/constants/constants";

export const getItemsFromLocalStorage = (): Item[] => {
  const items = getLocalStorage<Item[]>(LOCAL_STORAGE_ITEMS_KEY);

  return items ? items : [];
};
