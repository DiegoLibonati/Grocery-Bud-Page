import { v4 as uuidv4 } from "uuid";

import { Item } from "@src/entities/vite-env";

import { getElements } from "@src/helpers/getElements";
import { getItemsFromLocalStorage } from "@src/helpers/getItemsFromLocalStorage";
import { setLocalStorage } from "@src/helpers/setLocalStorage";

import { stateGrocery } from "@src/stateGrocery";
import { LOCAL_STORAGE_ITEMS_KEY } from "@src/constants/constants";

const addItemHtml = (item: Item): void => {
  const { containerShowItems } = getElements();

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
  buttonDelete.setAttribute("type", `button`);
  buttonDelete.setAttribute("aria-label", `delete item ${item.id}`);
  buttonDelete.setAttribute(
    "class",
    "btnDelete w-8 h-8 bg-primary rounded-full mr-2 hover:bg-opacity-75 active:scale-75 transition-all"
  );
  buttonDelete?.addEventListener("click", () => handleItemDelete(item.id));

  const iconDelete = document.createElement("i");
  iconDelete.setAttribute(
    "class",
    "fa-solid fa-trash flex items-center justify-center w-full text-white cursor-pointer"
  );

  buttonDelete.append(iconDelete);
  buttonsContainer.append(buttonDelete);

  const buttonEdit = document.createElement("button");
  buttonEdit.setAttribute("type", `button`);
  buttonEdit.setAttribute("aria-label", `edit item ${item.id}`);
  buttonEdit.setAttribute(
    "class",
    "btnEdit w-8 h-8 bg-primary rounded-full hover:bg-opacity-75 active:scale-75 transition-all"
  );
  buttonEdit?.addEventListener("click", () => handleItemEdit(item.id));

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

const addNewItem = (itemText: string): void => {
  const items = getItemsFromLocalStorage();

  const newItem = {
    id: uuidv4(),
    item: itemText,
  };

  // Agregar nuevo item
  items.push(newItem);
  setLocalStorage<Item[]>(LOCAL_STORAGE_ITEMS_KEY, items);

  addItemHtml(newItem);
};

const editItem = (itemText: string): void => {
  const { btnAddData } = getElements();

  const items = getItemsFromLocalStorage();
  const element = document.getElementById(stateGrocery.idItemEdit);
  const name = element!.children[0].children[0];
  name.textContent = itemText;

  const newItems = items.map((item) => {
    if (item.id === stateGrocery.idItemEdit) {
      item.item = itemText;
    }
    return item;
  });

  setLocalStorage<Item[]>(LOCAL_STORAGE_ITEMS_KEY, newItems);

  stateGrocery.isEditing = false;
  stateGrocery.idItemEdit = "";
  btnAddData.textContent = "+";
};

const handleItemDelete = (idItem: string): void => {
  const items = getItemsFromLocalStorage();

  const element = document.getElementById(idItem);
  element?.remove();

  const newItems = items.filter((item) => item.id !== idItem);

  setLocalStorage<Item[]>(LOCAL_STORAGE_ITEMS_KEY, newItems);
};

const handleItemEdit = (idItem: string): void => {
  const { btnAddData } = getElements();

  stateGrocery.isEditing = true;
  stateGrocery.idItemEdit = idItem;
  btnAddData.textContent = "✓";
};

const handleAddData = (): void => {
  const { inputDataEntry } = getElements();

  const inputValue: string = inputDataEntry.value.trim();

  if (!inputValue) return;

  if (!stateGrocery.isEditing) {
    addNewItem(inputValue);
  } else {
    editItem(inputValue);
  }

  inputDataEntry.value = "";
};

const handleClearAllItems = (): void => {
  const { containerShowItems } = getElements();

  containerShowItems.innerHTML = "";

  localStorage.clear();
};

const setInitialState = (): void => {
  stateGrocery.isEditing = false;
  stateGrocery.idItemEdit = "";
};

const onInit = () => {
  setInitialState();
  const { btnAddData, btnClearAllItems } = getElements();

  btnAddData.addEventListener("click", handleAddData);
  btnClearAllItems.addEventListener("click", handleClearAllItems);

  const items = getItemsFromLocalStorage();

  if (!items.length) return;

  items?.forEach((item) => {
    addItemHtml(item);
  });
};

document.addEventListener("DOMContentLoaded", onInit);
