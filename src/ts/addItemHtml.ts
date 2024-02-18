import { Item } from "../vite-env";
import { containerShowItems } from "./elements";
import { itemDelete } from "./itemDelete";
import { itemEdit } from "./itemEdit";

export const addItemHtml = (item: Item): void => {
  const itemContainer = document.createElement("li");
  itemContainer.id = item.id;
  itemContainer.setAttribute(
    "class",
    "flex items-center justify-between w-[75%] h-auto my-2"
  );

  const nameContainer = document.createElement("div");
  nameContainer.setAttribute("class", "section_container_items_list_li_title");

  const itemName = document.createElement("h2");
  itemName.textContent = item.item;
  itemName.setAttribute("class", "text-white text-base");

  nameContainer.append(itemName);
  itemContainer.append(nameContainer);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute(
    "class",
    "section_container_items_list_li_btns"
  );

  const buttonDelete = document.createElement("button");
  buttonDelete.type = "button";
  buttonDelete.setAttribute(
    "class",
    "btnDelete w-8 h-8 bg-[#8E7AB5] rounded-full mr-2 hover:bg-opacity-75 active:scale-75 transition-all"
  );
  buttonDelete?.addEventListener("click", () => itemDelete(item.id));

  const iconDelete = document.createElement("i");
  iconDelete.setAttribute(
    "class",
    "fa-solid fa-trash flex items-center justify-center w-full text-white cursor-pointer"
  );

  buttonDelete.append(iconDelete);
  buttonsContainer.append(buttonDelete);

  const buttonEdit = document.createElement("button");
  buttonEdit.type = "button";
  buttonEdit.setAttribute("class", "btnEdit w-8 h-8 bg-[#8E7AB5] rounded-full hover:bg-opacity-75 active:scale-75 transition-all");
  buttonEdit?.addEventListener("click", () => itemEdit(item.id));

  const iconEdit = document.createElement("i");
  iconEdit.setAttribute(
    "class",
    "fa-solid fa-pen-to-square flex items-center justify-center w-full text-white"
  );

  buttonEdit.append(iconEdit);
  buttonsContainer.append(buttonEdit);
  itemContainer.append(buttonsContainer);

  containerShowItems.append(itemContainer);
};
