# Grocery-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows you to add items to a list. These items can be edited and deleted. There is also a button to delete all items in the list. It is important to note that every item that is added, is saved in the LocalStorage. This allows to keep the items in each update of the page.

## Technologies used

1. Typescript
2. TailwindCSS
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/38`](https://www.diegolibonati.com.ar/#/project/38)

## Video

https://user-images.githubusercontent.com/99032604/199616057-b39c7e07-d4c3-4674-8cf2-2324ddcbbc68.mp4

## Documentation

The `btnAddData - Event Listener` function is in charge of adding to the LocalStorage the item that is added to the list too:

```
btnAddData.addEventListener("click", () => {
  const inputValue: string = inputDataEntry.value;

  if (!inputValue.trim()) return;

  if (!stateGrocery.isEditing) {
    onNewItem(inputValue);
  } else {
    onEditItem(inputValue);
  }

  inputDataEntry.value = "";
});
```

The `addItemHtml()` function is in charge of adding the HTML of the item that was added to the list:

```
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
```

The `onInit()` function is in charge of reading the LocalStorage each time the page is reloaded and adding the items to the list:

```
const onInit = (): void => {
  const list = getLocalStorage();

  list?.forEach((item) => {
    addItemHtml(item);
  });
};
```

The `getLocalStorage()` function is in charge of getting the LocalStorage information:

```
import { Item } from "../vite-env";

export const getLocalStorage = (): Item[] => {
  return JSON.parse(localStorage.getItem("list")!)
    ? JSON.parse(localStorage.getItem("list")!)
    : [];
};
```

The `itemDelete()` function is in charge of deleting an item when it is called:

```
import { getLocalStorage } from "./getLocalStorage";

export const itemDelete = (id: string): void => {
  const list = getLocalStorage();
  const element = document.getElementById(id);

  const newList = list.filter((item) => item.id !== id);

  localStorage.setItem("list", JSON.stringify(newList));
  element?.remove();
};
```

The `itemEdit()` and `onEdititem()` function is in charge of editing an item when it is called:

```
import { btnAddData } from "./elements";
import { stateGrocery } from "./stateGrocery";

export const itemEdit = (id: string): void => {
  stateGrocery.isEditing = true;
  stateGrocery.idItemEdit = id;
  btnAddData.textContent = "✓";
};

import { btnAddData } from "./elements";
import { getLocalStorage } from "./getLocalStorage";
import { stateGrocery } from "./stateGrocery";

export const onEditItem = (value: string): void => {
  const list = getLocalStorage();
  const element = document.getElementById(stateGrocery.idItemEdit);
  const name = element!.children[0].children[0];
  name.textContent = value;

  const newList = list.map((item) => {
    if (item.id === stateGrocery.idItemEdit) {
      item.item = value;
    }
    return item;
  });

  localStorage.setItem("list", JSON.stringify(newList));

  stateGrocery.isEditing = false;
  stateGrocery.idItemEdit = "";
  btnAddData.textContent = "+";
};
```
