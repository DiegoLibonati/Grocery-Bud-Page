import type { Item } from "@/types/app";

import { getLocalStorage } from "@/helpers/getLocalStorage";

import { LOCAL_STORAGE_ITEMS_KEY } from "@/constants/vars";

export const getItemsFromLocalStorage = (): Item[] => {
  const items = getLocalStorage(LOCAL_STORAGE_ITEMS_KEY) as Item[] | null;

  return items ?? [];
};
