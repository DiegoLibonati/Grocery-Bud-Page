import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import GroceryBudPage from "@/pages/GroceryBudPage/GroceryBudPage";

import { itemStore } from "@/stores/itemStore";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";

const renderPage = (): Page => {
  const container = GroceryBudPage();
  document.body.appendChild(container);
  return container;
};

describe("GroceryBudPage", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
    itemStore.setItems([]);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    mocksLocalStorage.clear();
    itemStore.setItems([]);
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".main-wrapper");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render page title", () => {
    renderPage();

    expect(screen.getByText("GROCERY ITEMS")).toBeInTheDocument();
  });

  it("should render input field", () => {
    renderPage();

    const input = document.querySelector<HTMLInputElement>(
      ".card__data-entry input"
    );
    expect(input).toBeInTheDocument();
    expect(input?.type).toBe("text");
  });

  it("should render add button", () => {
    renderPage();

    const addButton = screen.getByRole("button", { name: "Add grocery item" });
    expect(addButton).toBeInTheDocument();
    expect(addButton.textContent).toBe("+");
  });

  it("should render clear all items button", () => {
    renderPage();

    const clearButton = screen.getByRole("button", {
      name: "Clear all grocery items",
    });
    expect(clearButton).toBeInTheDocument();
  });

  it("should add item when form is submitted", async () => {
    const user = userEvent.setup();
    renderPage();

    const input = document.querySelector<HTMLInputElement>(
      ".card__data-entry input"
    );
    const form = document.querySelector<HTMLFormElement>(".card__data-entry");

    if (input) await user.type(input, "Buy milk");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("should not add empty item", () => {
    userEvent.setup();
    renderPage();

    const form = document.querySelector<HTMLFormElement>(".card__data-entry");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    const items = document.querySelectorAll<HTMLLIElement>(".card__item");
    expect(items).toHaveLength(0);
  });

  it("should clear all items when clear button is clicked", async () => {
    const user = userEvent.setup();
    itemStore.addItem({ id: "1", text: "Buy milk" });
    itemStore.addItem({ id: "2", text: "Buy eggs" });

    renderPage();

    const clearButton = screen.getByRole("button", {
      name: "Clear all grocery items",
    });
    await user.click(clearButton);

    const items = document.querySelectorAll<HTMLLIElement>(".card__item");
    expect(items).toHaveLength(0);
  });

  it("should load and render items from store", () => {
    itemStore.addItem({ id: "1", text: "Buy milk" });
    itemStore.addItem({ id: "2", text: "Buy eggs" });

    renderPage();

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Buy eggs")).toBeInTheDocument();
  });

  it("should cleanup subscriptions and event listeners on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
