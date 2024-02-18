import { btnAddData } from "./elements";
import { stateGrocery } from "./stateGrocery";

export const itemEdit = (id: string): void => {
  stateGrocery.isEditing = true;
  stateGrocery.idItemEdit = id;
  btnAddData.textContent = "✓";
};
