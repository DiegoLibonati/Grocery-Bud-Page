import { addItemHtml } from "./addItemHtml";
import { getLocalStorage } from "./getLocalStorage";
import { v4 as uuidv4 } from "uuid";

export const onNewItem = (value: string): void => {
  const list = getLocalStorage();

  const item = {
    id: uuidv4(),
    item: value,
  };

  // Agregar nuevo item
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));

  addItemHtml(item);
};
