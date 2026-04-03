import type { Item } from "@/types/app";

import { ItemStore } from "@/stores/itemStore";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";

describe("ItemStore", () => {
  let store: ItemStore;

  beforeEach(() => {
    mockLocalStorage.clear();
    store = new ItemStore({
      items: [],
      idItemEdit: "",
    });
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should initialize with empty items", () => {
    const state = store.getState();

    expect(state.items).toEqual([]);
    expect(state.idItemEdit).toBe("");
  });

  it("should add item to store", () => {
    const newItem: Item = { id: "1", text: "Buy milk" };

    store.addItem(newItem);

    expect(store.get("items")).toContainEqual(newItem);
  });

  it("should save item to localStorage when added", () => {
    const newItem: Item = { id: "1", text: "Buy milk" };

    store.addItem(newItem);

    const stored = mockLocalStorage.getItem("items");
    expect(stored).toBe(JSON.stringify([newItem]));
  });

  it("should get item by id", () => {
    const item: Item = { id: "1", text: "Buy milk" };
    store.addItem(item);

    const result = store.getItemById("1");

    expect(result).toEqual(item);
  });

  it("should return undefined for non-existent item id", () => {
    const result = store.getItemById("non-existent");

    expect(result).toBeUndefined();
  });

  it("should delete item by id", () => {
    const item: Item = { id: "1", text: "Buy milk" };
    store.addItem(item);

    store.deleteItemById("1");

    expect(store.get("items")).toEqual([]);
  });

  it("should update localStorage when item is deleted", () => {
    const item: Item = { id: "1", text: "Buy milk" };
    store.addItem(item);

    store.deleteItemById("1");

    const stored = mockLocalStorage.getItem("items");
    expect(stored).toBe(JSON.stringify([]));
  });

  it("should set editing item id", () => {
    store.setEditingItem("1");

    expect(store.get("idItemEdit")).toBe("1");
  });

  it("should edit item text", () => {
    const item: Item = { id: "1", text: "Buy milk" };
    store.addItem(item);
    store.setEditingItem("1");

    store.setEditItem("Buy bread");

    const updatedItem = store.getItemById("1");
    expect(updatedItem?.text).toBe("Buy bread");
    expect(store.get("idItemEdit")).toBe("");
  });

  it("should clear localStorage when setting empty items", () => {
    const item: Item = { id: "1", text: "Buy milk" };
    store.addItem(item);

    store.setItems([]);

    expect(mockLocalStorage.length).toBe(0);
  });
});
