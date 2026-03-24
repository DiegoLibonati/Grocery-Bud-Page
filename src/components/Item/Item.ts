import type { ItemProps } from "@/types/props";
import type { ItemComponent } from "@/types/components";

import { ButtonPrimary } from "@/components/ButtonPrimary/ButtonPrimary";

import { itemStore } from "@/stores/itemStore";

const handleDeleteItem = (id: string): void => {
  itemStore.deleteItemById(id);
};

const handleEditItem = (
  id: string,
  input: HTMLInputElement,
  buttonAdd: HTMLButtonElement
): void => {
  const item = itemStore.getItemById(id);

  if (!item) return;

  itemStore.setEditingItem(id);
  input.value = item.text;
  buttonAdd.textContent = "✓";
};

export const Item = ({ id, text }: ItemProps): ItemComponent => {
  const itemRoot = document.createElement("li") as ItemComponent;
  itemRoot.id = id;
  itemRoot.className =
    "flex items-center justify-between w-[75%] h-auto my-2 card__item";

  itemRoot.innerHTML = `
    <div class="card__item-header">
        <h2 class="text-white text-base">${text}</h2>
    </div>

    <div class="card__item-actions">
    </div>
  `;

  const cardItemActions = itemRoot.querySelector<HTMLDivElement>(
    ".card__item-actions"
  );

  const buttonDelete = ButtonPrimary({
    id: "delete-item",
    className: "w-8 h-8 rounded-full mr-2 card__item-action-delete",
    ariaLabel: `Delete grocery item "${text}"`,
    children:
      '<i class="fa-solid fa-trash flex items-center justify-center w-full text-white cursor-pointer"></i>',
    onClick: () => {
      handleDeleteItem(id);
    },
  });

  const buttonEdit = ButtonPrimary({
    id: "edit-item",
    className: "w-8 h-8 rounded-full mr-2 card__item-action-edit",
    ariaLabel: `Edit grocery item "${text}"`,
    children:
      "<i class='fa-solid fa-pen-to-square flex items-center justify-center w-full text-white'></i>",
    onClick: () => {
      const input = document.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const buttonAdd = document.querySelector<HTMLButtonElement>(
        ".card__data-entry button"
      );

      if (input && buttonAdd) {
        handleEditItem(id, input, buttonAdd);
      }
    },
  });

  cardItemActions?.append(buttonDelete, buttonEdit);

  itemRoot.cleanup = (): void => {
    buttonDelete.cleanup?.();
    buttonEdit.cleanup?.();
  };

  return itemRoot;
};
