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
