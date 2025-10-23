import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ItemProps } from "@src/entities/props";

import { Item } from "@src/components/Item/Item";

import { itemStore } from "@src/stores/itemStore";

type RenderComponent = {
  props: ItemProps;
  container: HTMLLIElement;
};

const renderComponent = (id: string, text: string): RenderComponent => {
  const props: ItemProps = {
    id: id,
    text: text,
  };

  const container = Item({
    id: props.id,
    text: props.text,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

jest.mock("@src/stores/itemStore", () => ({
  itemStore: {
    deleteItemById: jest.fn(),
    getItemById: jest.fn(),
    setEditingItem: jest.fn(),
  },
}));

describe("Item.ts", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="card__data-entry">
        <input type="text" />
        <button>Add</button>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    const props = {
      id: "test-item-1",
      text: "Test item text",
    };

    test("It should create a list item element with correct attributes", () => {
      const { container } = renderComponent(props.id, props.text);

      expect(container).toBeInstanceOf(HTMLLIElement);
      expect(container.id).toBe(props.id);
      expect(container.className).toContain("card__item");
    });

    test("It should have correct styling classes", () => {
      const { container } = renderComponent(props.id, props.text);

      expect(container.className).toContain("flex");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-between");
      expect(container.className).toContain("w-[75%]");
      expect(container.className).toContain("h-auto");
      expect(container.className).toContain("my-2");
    });

    test("It should render the item text correctly", () => {
      const { container } = renderComponent(props.id, props.text);

      const header = container.querySelector(".card__item-header h2");

      expect(header).toBeInTheDocument();
      expect(header?.textContent).toBe(props.text);
    });

    test("It should contain item header section", () => {
      const { container } = renderComponent(props.id, props.text);

      const header = container.querySelector(".card__item-header");

      expect(header).toBeInTheDocument();
    });

    test("It should contain item actions section", () => {
      const { container } = renderComponent(props.id, props.text);

      const actions = container.querySelector(".card__item-actions");

      expect(actions).toBeInTheDocument();
    });
  });

  describe("Action buttons", () => {
    const props = {
      id: "test-item-1",
      text: "Test item",
    };

    test("It should render delete button", () => {
      renderComponent(props.id, props.text);

      const deleteButton = screen.getByRole("button", {
        name: `delete item ${props.id}`,
      });

      expect(deleteButton).toBeInTheDocument();
    });

    test("It should render edit button", () => {
      renderComponent(props.id, props.text);

      const editButton = screen.getByRole("button", {
        name: `edit item ${props.id}`,
      });

      expect(editButton).toBeInTheDocument();
    });

    test("Delete button should have correct classes", () => {
      const { container } = renderComponent(props.id, props.text);

      const deleteButton = container.querySelector(".card__item-action-delete");

      expect(deleteButton?.className).toContain("w-8");
      expect(deleteButton?.className).toContain("h-8");
      expect(deleteButton?.className).toContain("rounded-full");
      expect(deleteButton?.className).toContain("mr-2");
    });

    test("Edit button should have correct classes", () => {
      const { container } = renderComponent(props.id, props.text);

      const editButton = container.querySelector(".card__item-action-edit");

      expect(editButton?.className).toContain("w-8");
      expect(editButton?.className).toContain("h-8");
      expect(editButton?.className).toContain("rounded-full");
      expect(editButton?.className).toContain("mr-2");
    });

    test("Delete button should contain trash icon", () => {
      const { container } = renderComponent(props.id, props.text);

      const deleteButton = container.querySelector(".card__item-action-delete");
      const icon = deleteButton?.querySelector(".fa-trash");

      expect(icon).toBeInTheDocument();
      expect(icon?.classList.contains("fa-solid")).toBe(true);
    });

    test("Edit button should contain edit icon", () => {
      const { container } = renderComponent(props.id, props.text);

      const editButton = container.querySelector(".card__item-action-edit");
      const icon = editButton?.querySelector(".fa-pen-to-square");

      expect(icon).toBeInTheDocument();
      expect(icon?.classList.contains("fa-solid")).toBe(true);
    });
  });

  describe("Delete functionality", () => {
    test("It should call deleteItemById when delete button is clicked", async () => {
      const props = {
        id: "item-to-delete",
        text: "Delete me",
      };

      renderComponent(props.id, props.text);

      const deleteButton = screen.getByRole("button", {
        name: `delete item ${props.id}`,
      });

      await user.click(deleteButton);

      expect(itemStore.deleteItemById).toHaveBeenCalledTimes(1);
      expect(itemStore.deleteItemById).toHaveBeenCalledWith(props.id);
    });

    test("It should call deleteItemById with correct id on multiple clicks", async () => {
      const props = {
        id: "item-to-delete",
        text: "Delete me",
      };

      renderComponent(props.id, props.text);

      const deleteButton = screen.getByRole("button", {
        name: `delete item ${props.id}`,
      });

      await user.click(deleteButton);
      await user.click(deleteButton);

      expect(itemStore.deleteItemById).toHaveBeenCalledTimes(2);
      expect(itemStore.deleteItemById).toHaveBeenCalledWith(props.id);
    });
  });

  describe("Edit functionality", () => {
    test("It should call store methods when edit button is clicked", async () => {
      const props = {
        id: "item-to-edit",
        text: "Edit me",
      };

      const mockItem = { id: props.id, text: props.text };
      (itemStore.getItemById as jest.Mock).mockReturnValue(mockItem);

      renderComponent(props.id, props.text);

      const editButton = screen.getByRole("button", {
        name: `edit item ${props.id}`,
      });

      await user.click(editButton);

      expect(itemStore.getItemById).toHaveBeenCalledWith(props.id);
      expect(itemStore.setEditingItem).toHaveBeenCalledWith(props.id);
    });

    test("It should populate input with item text when edit is clicked", async () => {
      const props = {
        id: "item-to-edit",
        text: "Original text",
      };

      const mockItem = { id: props.id, text: props.text };
      (itemStore.getItemById as jest.Mock).mockReturnValue(mockItem);

      renderComponent(props.id, props.text);

      const input = document.querySelector<HTMLInputElement>(
        ".card__data-entry input"
      );
      const editButton = screen.getByRole("button", {
        name: `edit item ${props.id}`,
      });

      await user.click(editButton);

      expect(input?.value).toBe(props.text);
    });

    test("It should change button text to checkmark when edit is clicked", async () => {
      const props = {
        id: "item-to-edit",
        text: "Edit text",
      };

      const mockItem = { id: props.id, text: props.text };
      (itemStore.getItemById as jest.Mock).mockReturnValue(mockItem);

      renderComponent(props.id, props.text);

      const buttonAdd = document.querySelector<HTMLButtonElement>(
        ".card__data-entry button"
      );
      const editButton = screen.getByRole("button", {
        name: `edit item ${props.id}`,
      });

      await user.click(editButton);

      expect(buttonAdd?.textContent).toBe("✓");
    });

    test("It should not call setEditingItem if item does not exist", async () => {
      const props = {
        id: "non-existent-item",
        text: "No item",
      };

      (itemStore.getItemById as jest.Mock).mockReturnValue(null);

      renderComponent(props.id, props.text);

      const editButton = screen.getByRole("button", {
        name: `edit item ${props.id}`,
      });

      await user.click(editButton);

      expect(itemStore.getItemById).toHaveBeenCalledWith(props.id);
      expect(itemStore.setEditingItem).not.toHaveBeenCalled();
    });
  });

  describe("Content rendering", () => {
    test("It should render item with short text", () => {
      const { container } = renderComponent("item-1", "Short");

      const header = container.querySelector(".card__item-header h2");

      expect(header?.textContent).toBe("Short");
    });

    test("It should render item with long text", () => {
      const longText =
        "This is a very long text that should still be rendered correctly without any issues";
      const { container } = renderComponent("item-2", longText);

      const header = container.querySelector(".card__item-header h2");

      expect(header?.textContent).toBe(longText);
    });

    test("It should render item with special characters", () => {
      const specialText = "Special <>&\"' characters";
      const { container } = renderComponent("item-3", specialText);

      const header = container.querySelector(".card__item-header h2");

      expect(header?.textContent).toBe(specialText);
    });

    test("It should render multiple items with different ids", () => {
      const item1 = renderComponent("item-1", "First item");
      const item2 = renderComponent("item-2", "Second item");

      expect(item1.container.id).toBe("item-1");
      expect(item2.container.id).toBe("item-2");
      expect(document.querySelectorAll(".card__item")).toHaveLength(2);
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty text", () => {
      const { container } = renderComponent("empty-item", "");

      const header = container.querySelector(".card__item-header h2");

      expect(header?.textContent).toBe("");
      expect(header).toBeInTheDocument();
    });

    test("It should handle numeric text", () => {
      const { container } = renderComponent("numeric-item", "12345");

      const header = container.querySelector(".card__item-header h2");

      expect(header?.textContent).toBe("12345");
    });
  });
});
