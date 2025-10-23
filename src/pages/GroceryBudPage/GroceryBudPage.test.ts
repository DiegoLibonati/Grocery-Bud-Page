import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { GroceryBudPage } from "@src/pages/GroceryBudPage/GroceryBudPage";

import { itemStore } from "@src/stores/itemStore";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = GroceryBudPage();
  document.body.appendChild(container);

  return {
    container: container,
  };
};

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid-1234"),
}));

jest.mock("@src/stores/itemStore", () => ({
  itemStore: {
    getState: jest.fn(),
    addItem: jest.fn(),
    setItems: jest.fn(),
    setEditItem: jest.fn(),
    subscribe: jest.fn(),
  },
}));

describe("GroceryBudPage.ts", () => {
  beforeEach(() => {
    (itemStore.getState as jest.Mock).mockReturnValue({
      items: [],
      idItemEdit: null,
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("It should create a main element", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.tagName).toBe("MAIN");
    });

    test("It should have correct styling classes", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("flex");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-center");
      expect(container.className).toContain("w-full");
      expect(container.className).toContain("h-screen");
      expect(container.className).toContain("bg-primary");
      expect(container.className).toContain("main-wrapper");
    });

    test("It should render the main card section", () => {
      const { container } = renderComponent();

      const card = container.querySelector(".card");

      expect(card).toBeInTheDocument();
      expect(card?.className).toContain("bg-secondary");
      expect(card?.className).toContain("rounded-lg");
    });

    test("It should render the header with title", () => {
      const { container } = renderComponent();

      const header = container.querySelector(".card__header h2");

      expect(header).toBeInTheDocument();
      expect(header?.textContent).toContain("GROCERY ITEMS");
    });
  });

  describe("Input and Add Button", () => {
    test("It should render input field inside a form", () => {
      const { container } = renderComponent();

      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");
      const input = form?.querySelector<HTMLInputElement>("input");

      expect(form).toBeInTheDocument();
      expect(form?.tagName).toBe("FORM");
      expect(input).toBeInTheDocument();
      expect(input?.type).toBe("text");
    });

    test("Input should have correct styling classes", () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );

      expect(input?.className).toContain("outline-none");
      expect(input?.className).toContain("rounded-lg");
      expect(input?.className).toContain("bg-primary");
      expect(input?.className).toContain("text-white");
    });

    test("It should render add button with submit type", () => {
      renderComponent();

      const addButton = screen.getByRole("button", { name: /add item/i });

      expect(addButton).toBeInTheDocument();
      expect(addButton.textContent).toBe("+");
      expect((addButton as HTMLButtonElement).type).toBe("submit");
    });

    test("Add button should have correct classes", () => {
      renderComponent();

      const addButton = screen.getByRole("button", { name: /add item/i });

      expect(addButton.className).toContain("w-8");
      expect(addButton.className).toContain("h-8");
      expect(addButton.className).toContain("rounded-full");
      expect(addButton.className).toContain("ml-2");
    });

    test("It should render clear all items button", () => {
      renderComponent();

      const clearButton = screen.getByRole("button", {
        name: /clear all items/i,
      });

      expect(clearButton).toBeInTheDocument();
      expect(clearButton.textContent).toBe("CLEAR ALL ITEMS");
    });
  });

  describe("Items List Section", () => {
    test("It should render items list container", () => {
      const { container } = renderComponent();

      const itemsList = container.querySelector(".card__items-list");

      expect(itemsList).toBeInTheDocument();
      expect(itemsList?.tagName).toBe("UL");
    });

    test("It should render empty list when no items", () => {
      const { container } = renderComponent();

      const itemsList = container.querySelector(".card__items-list");

      expect(itemsList?.children.length).toBe(0);
    });

    test("It should call itemStore.subscribe on mount", () => {
      renderComponent();

      expect(itemStore.subscribe).toHaveBeenCalledWith(
        "items",
        expect.any(Function)
      );
    });
  });

  describe("Add Item Functionality", () => {
    test("It should add item when form is submitted with input value", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "New Item";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).toHaveBeenCalledWith({
        id: "mock-uuid-1234",
        text: "New Item",
      });
    });

    test("It should clear input after adding item", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "New Item";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(input?.value).toBe("");
    });

    test("It should trim input value before adding", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "  Trimmed Item  ";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).toHaveBeenCalledWith({
        id: "mock-uuid-1234",
        text: "Trimmed Item",
      });
    });

    test("It should add multiple items with different UUIDs", async () => {
      const { v4 } = require("uuid");
      (v4 as jest.Mock)
        .mockReturnValueOnce("uuid-1")
        .mockReturnValueOnce("uuid-2");

      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "First Item";
      let submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      input!.value = "Second Item";
      submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).toHaveBeenCalledTimes(2);
      expect(itemStore.addItem).toHaveBeenNthCalledWith(1, {
        id: "uuid-1",
        text: "First Item",
      });
      expect(itemStore.addItem).toHaveBeenNthCalledWith(2, {
        id: "uuid-2",
        text: "Second Item",
      });
    });

    test("It should prevent default form submission", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "Test Item";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");

      form?.dispatchEvent(submitEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("Edit Item Functionality", () => {
    test("It should call setEditItem when in edit mode", async () => {
      (itemStore.getState as jest.Mock).mockReturnValue({
        items: [],
        idItemEdit: "edit-item-123",
      });

      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "Edited Text";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.setEditItem).toHaveBeenCalledWith("Edited Text");
    });

    test("It should clear input after editing item", async () => {
      (itemStore.getState as jest.Mock).mockReturnValue({
        items: [],
        idItemEdit: "edit-item-123",
      });

      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "Edited Text";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(input?.value).toBe("");
    });

    test("It should change button text back to + after editing", async () => {
      (itemStore.getState as jest.Mock).mockReturnValue({
        items: [],
        idItemEdit: "edit-item-123",
      });

      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");
      const addButton = screen.getByRole("button", { name: /add item/i });

      addButton.textContent = "✓";
      input!.value = "Edited Text";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(submitEvent, "currentTarget", {
        value: form,
        writable: false,
      });
      form?.dispatchEvent(submitEvent);

      screen.debug();

      expect(addButton.textContent).toBe("+");
    });

    test("It should not call addItem when in edit mode", async () => {
      (itemStore.getState as jest.Mock).mockReturnValue({
        items: [],
        idItemEdit: "edit-item-123",
      });

      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "Edited Text";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).not.toHaveBeenCalled();
    });

    test("It should trim input value when editing", async () => {
      (itemStore.getState as jest.Mock).mockReturnValue({
        items: [],
        idItemEdit: "edit-item-123",
      });

      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "  Trimmed Edit  ";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.setEditItem).toHaveBeenCalledWith("Trimmed Edit");
    });
  });

  describe("Clear All Items Functionality", () => {
    test("It should call setItems with empty array when clear button is clicked", async () => {
      renderComponent();

      const clearButton = screen.getByRole("button", {
        name: /clear all items/i,
      });

      await user.click(clearButton);

      expect(itemStore.setItems).toHaveBeenCalledWith([]);
    });

    test("It should call setItems multiple times when clicked multiple times", async () => {
      renderComponent();

      const clearButton = screen.getByRole("button", {
        name: /clear all items/i,
      });

      await user.click(clearButton);
      await user.click(clearButton);
      await user.click(clearButton);

      expect(itemStore.setItems).toHaveBeenCalledTimes(3);
    });
  });

  describe("Render Items", () => {
    test("It should call getState to retrieve items", () => {
      renderComponent();

      expect(itemStore.getState).toHaveBeenCalled();
    });

    test("It should call renderItems on initialization", () => {
      (itemStore.getState as jest.Mock).mockReturnValue({
        items: [
          { id: "1", text: "Item 1" },
          { id: "2", text: "Item 2" },
        ],
        idItemEdit: null,
      });

      const { container } = renderComponent();

      expect(itemStore.getState).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    test("It should handle empty string input", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).toHaveBeenCalledWith({
        id: "mock-uuid-1234",
        text: "",
      });
    });

    test("It should handle whitespace-only input", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "   ";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).toHaveBeenCalledWith({
        id: "mock-uuid-1234",
        text: "",
      });
    });

    test("It should handle very long text input", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      const longText = "a".repeat(1000);
      input!.value = longText;

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).toHaveBeenCalledWith({
        id: "mock-uuid-1234",
        text: longText,
      });
    });

    test("It should handle special characters in input", async () => {
      const { container } = renderComponent();

      const input = container.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      input!.value = "<script>alert('test')</script>";

      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form?.dispatchEvent(submitEvent);

      expect(itemStore.addItem).toHaveBeenCalledWith({
        id: "mock-uuid-1234",
        text: "<script>alert('test')</script>",
      });
    });
  });

  describe("Structure and Layout", () => {
    test("It should have all main sections", () => {
      const { container } = renderComponent();

      expect(container.querySelector(".card__header")).toBeInTheDocument();
      expect(container.querySelector(".card__data-entry")).toBeInTheDocument();
      expect(container.querySelector(".card__items")).toBeInTheDocument();
      expect(container.querySelector(".card__actions")).toBeInTheDocument();
    });

    test("It should have correct section structure", () => {
      const { container } = renderComponent();

      const section = container.querySelector("section");

      expect(section?.querySelector(".card__header")).toBeInTheDocument();
      expect(section?.querySelector(".card__data-entry")).toBeInTheDocument();
      expect(section?.querySelector(".card__items")).toBeInTheDocument();
      expect(section?.querySelector(".card__actions")).toBeInTheDocument();
    });

    test("Form should be inside card__data-entry section", () => {
      const { container } = renderComponent();

      const form =
        container.querySelector<HTMLFormElement>(".card__data-entry");

      expect(form?.tagName).toBe("FORM");
      expect(form?.querySelector("input")).toBeInTheDocument();
      expect(form?.querySelector("button")).toBeInTheDocument();
    });
  });
});
