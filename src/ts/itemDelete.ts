import { getLocalStorage } from "./getLocalStorage";

export const itemDelete = (id: string): void => {
  const list = getLocalStorage();
  const element = document.getElementById(id);

  const newList = list.filter((item) => item.id !== id);

  localStorage.setItem("list", JSON.stringify(newList));
  element?.remove();
};
