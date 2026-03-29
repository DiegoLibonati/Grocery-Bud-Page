import { v4 as uuidv4 } from "uuid";

import type { Item as ItemT } from "@/types/app";
import type { Page } from "@/types/pages";
import type { ItemComponent } from "@/types/components";

import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary";
import Item from "@/components/Item/Item";

import { itemStore } from "@/stores/itemStore";

const handleClickAdd = (e: SubmitEvent, input: HTMLInputElement): void => {
  e.preventDefault();

  const { idItemEdit } = itemStore.getState();

  const value = input.value.trim();

  if (!value) return;

  if (idItemEdit) {
    itemStore.setEditItem(value);
    input.value = "";
    const btnAdd = (
      e.currentTarget as HTMLFormElement
    ).querySelector<HTMLButtonElement>("#add-item");
    if (btnAdd) btnAdd.textContent = "+";
    return;
  }

  const item: ItemT = {
    id: uuidv4(),
    text: value,
  };

  itemStore.addItem(item);

  input.value = "";
};

const handleClearAllItems = (): void => {
  itemStore.setItems([]);
};

const GroceryBudPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = `flex items-center justify-center w-full h-screen bg-primary main-wrapper`;

  main.innerHTML = `
    <section class="h-auto w-[80%] bg-secondary p-2 rounded-lg md:w-[60%] lg:w-[50%] 2xl:w-[40%] card">
        <div class="card__header">
            <h2 class="text-2xl text-center font-semibold text-white">
              GROCERY ITEMS
            </h2>
        </div>

        <form
          class="flex items-center justify-center mt-2 card__data-entry"
        >
            <input
              type="text"
              class="outline-none rounded-lg bg-primary text-white text-xs h-8 w-[75%] pl-2"
            />
        </form>

        <div class="mt-2 card__items">
            <ul
              class="flex flex-col items-center justify-start w-full h-auto card__items-list"
            ></ul>
        </div>

        <div class="flex items-center justify-center card__actions">
        </div>
    </section>
  `;

  const cardDataEntry =
    main.querySelector<HTMLFormElement>(".card__data-entry");
  const cardActions = main.querySelector<HTMLDivElement>(".card__actions");

  const input = main.querySelector<HTMLInputElement>(".card__data-entry input");

  const buttonAdd = ButtonPrimary({
    id: "add-item",
    className: "w-8 h-8 text-white rounded-full ml-2",
    ariaLabel: "Add grocery item",
    type: "submit",
    children: "+",
  });

  const buttonClearAllItems = ButtonPrimary({
    id: "clear-all-items",
    ariaLabel: "Clear all grocery items",
    className: "text-white rounded-lg p-2 mt-2",
    children: "CLEAR ALL ITEMS",
    onClick: handleClearAllItems,
  });

  const handleFormSubmit = (e: SubmitEvent): void => {
    handleClickAdd(e, input!);
  };

  cardDataEntry?.addEventListener("submit", handleFormSubmit);
  cardDataEntry?.append(buttonAdd);

  cardActions?.append(buttonClearAllItems);

  const currentItems = new Map<string, ItemComponent>();

  const renderItems = (): void => {
    const { items } = itemStore.getState();

    const cardItems = main.querySelector<HTMLUListElement>(".card__items-list");

    currentItems.forEach((item) => {
      item.cleanup?.();
    });
    currentItems.clear();

    cardItems?.replaceChildren();

    items.forEach((i) => {
      const item = Item({
        id: i.id,
        text: i.text,
      });

      currentItems.set(i.id, item);

      cardItems?.append(item);
    });
  };

  renderItems();

  const unsubscribe = itemStore.subscribe("items", renderItems);

  main.cleanup = (): void => {
    unsubscribe();

    cardDataEntry?.removeEventListener("submit", handleFormSubmit);

    buttonAdd.cleanup?.();
    buttonClearAllItems.cleanup?.();

    currentItems.forEach((item) => {
      item.cleanup?.();
    });
    currentItems.clear();
  };

  return main;
};

export default GroceryBudPage;
