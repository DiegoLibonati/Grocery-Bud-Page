import { LOCAL_STORAGE_ITEMS_KEY } from "@src/constants/vars";
import { Item } from "@src/entities/app";
import { ItemState } from "@src/entities/states";

import { getItemsFromLocalStorage } from "@src/helpers/getItemsFromLocalStorage";
import { setLocalStorage } from "@src/helpers/setLocalStorage";

import { Store } from "@src/core/store";

export class ItemStore extends Store<ItemState> {
  constructor(initialState: ItemState) {
    super(initialState);
  }

  public getItemById(id: string): Item | undefined {
    const { items } = this.getState();

    return items.find((item) => item.id === id);
  }

  public setItems(items: Item[]): void {
    if (items.length === 0) localStorage.clear();

    this.setState({ items: items });
  }

  public addItem(item: Item): void {
    const { items } = this.getState();

    this.setState({ items: [...items, item] });

    setLocalStorage<Item[]>(LOCAL_STORAGE_ITEMS_KEY, this.get("items"));
  }

  public deleteItemById(id: string): void {
    const { items } = this.getState();

    const newItems = items.filter((item) => item.id !== id);

    this.setItems(newItems);
    setLocalStorage<Item[]>(LOCAL_STORAGE_ITEMS_KEY, newItems);
  }

  public setEditingItem(id: string): void {
    this.setState({ idItemEdit: id });
  }

  public setEditItem(text: string): void {
    const { items, idItemEdit } = this.getState();

    const newItems = items.map((i) => {
      if (i.id == idItemEdit) {
        return {
          id: i.id,
          text: text,
        };
      }

      return i;
    });

    this.setItems(newItems);
    this.setEditingItem("");
    setLocalStorage<Item[]>(LOCAL_STORAGE_ITEMS_KEY, newItems);
  }
}

export const itemStore = new ItemStore({
  items: getItemsFromLocalStorage(),
  idItemEdit: "",
});
