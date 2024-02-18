import { addItemHtml } from "./ts/addItemHtml";
import {
  btnAddData,
  btnClearAllItems,
  containerShowItems,
  inputDataEntry,
} from "./ts/elements";
import { getLocalStorage } from "./ts/getLocalStorage";
import { onEditItem } from "./ts/onEditItem";
import { onNewItem } from "./ts/onNewItem";
import { stateGrocery } from "./ts/stateGrocery";
import "./styles.css"

const onInit = (): void => {
  const list = getLocalStorage();

  list?.forEach((item) => {
    addItemHtml(item);
  });
};

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

btnClearAllItems.addEventListener("click", () => {
  containerShowItems.innerHTML = "";

  localStorage.clear();
});

onInit();