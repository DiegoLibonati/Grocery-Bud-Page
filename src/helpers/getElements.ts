export const getElements = () => ({
  inputDataEntry: document.querySelector(
    ".section_container_dataentry input"
  ) as HTMLInputElement,
  btnAddData: document.querySelector(
    ".section_container_dataentry button"
  ) as HTMLButtonElement,
  containerShowItems: document.querySelector(
    ".section_container_items_list"
  ) as HTMLUListElement,
  btnClearAllItems: document.querySelector(
    ".section_container_clearitems button"
  ) as HTMLButtonElement,
});
