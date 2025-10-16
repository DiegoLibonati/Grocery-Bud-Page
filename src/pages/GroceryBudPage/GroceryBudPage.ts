import { v4 as uuidv4 } from "uuid";

import { Item as ItemT } from "@src/entities/app";

import { ButtonPrimary } from "@src/components/ButtonPrimary/ButtonPrimary";
import { Item } from "@src/components/Item/Item";

import { itemStore } from "@src/stores/itemStore";

const handleClickAdd = (e: SubmitEvent, input: HTMLInputElement) => {
  e.preventDefault();

  const { idItemEdit } = itemStore.getState();

  const value = input.value.trim();

  if (idItemEdit) {
    itemStore.setEditItem(value);
    input.value = "";
    const btnAdd = (
      e.currentTarget as HTMLFormElement
    ).querySelector<HTMLButtonElement>("#add-item");
    btnAdd!.textContent = "+";
    return;
  }

  const item: ItemT = {
    id: uuidv4(),
    text: value,
  };

  itemStore.addItem(item);

  input.value = "";
};

const handleClearAllItems = () => {
  itemStore.setItems([]);
};

export const GroceryBudPage = (): HTMLElement => {
  const main = document.createElement("main");
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

  const cardDataEntry = main.querySelector<HTMLDivElement>(".card__data-entry");
  const cardActions = main.querySelector<HTMLDivElement>(".card__actions");

  const input = main.querySelector<HTMLInputElement>(".card__data-entry input");

  const buttonAdd = ButtonPrimary({
    id: "add-item",
    className: "w-8 h-8 text-white rounded-full ml-2",
    ariaLabel: "add item",
    type: "submit",
    children: "+",
  });
  const buttonClearAllItems = ButtonPrimary({
    id: "clear-all-items",
    ariaLabel: "clear all items",
    className: "text-white rounded-lg p-2 mt-2",
    children: "CLEAR ALL ITEMS",
    onClick: handleClearAllItems,
  });

  cardDataEntry?.addEventListener("submit", (e) => handleClickAdd(e, input!));
  cardDataEntry?.append(buttonAdd);

  cardActions?.append(buttonClearAllItems);

  const renderItems = () => {
    const { items } = itemStore.getState();

    const cardItems = main.querySelector<HTMLUListElement>(".card__items-list");
    cardItems?.replaceChildren();

    items.forEach((i) => {
      const item = Item({
        id: i.id,
        text: i.text,
      });

      cardItems?.append(item);
    });
  };

  renderItems();

  itemStore.subscribe("items", renderItems);

  return main;
};
