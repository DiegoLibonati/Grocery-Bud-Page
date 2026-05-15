import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ItemProps } from "@/types/props";
import type { ItemComponent } from "@/types/components";

import Item from "@/components/Item/Item";

import { itemStore } from "@/stores/itemStore";

const defaultProps: ItemProps = {
  id: "1",
  text: "Buy milk",
};

const renderComponent = (props: Partial<ItemProps> = {}): ItemComponent => {
  const element = Item({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Item", () => {
  beforeEach(() => {
    localStorage.clear();
    itemStore.setState({
      items: [{ id: "1", text: "Buy milk" }],
      idItemEdit: "",
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a list item element", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toHaveAttribute("id", "1");
    });

    it("should display the item text", () => {
      renderComponent();
      expect(screen.getByText("Buy milk")).toBeInTheDocument();
    });

    it("should render a delete button with correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: `Delete grocery item "Buy milk"` })
      ).toBeInTheDocument();
    });

    it("should render an edit button with correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      ).toBeInTheDocument();
    });
  });

  describe("delete behavior", () => {
    it("should call itemStore.deleteItemById with the item id", async () => {
      const user = userEvent.setup();
      const mockDeleteItemById = jest.spyOn(itemStore, "deleteItemById");
      renderComponent();
      await user.click(
        screen.getByRole("button", { name: `Delete grocery item "Buy milk"` })
      );
      expect(mockDeleteItemById).toHaveBeenCalledWith("1");
    });
  });

  describe("edit behavior", () => {
    let mockInput: HTMLInputElement;
    let mockSubmitBtn: HTMLButtonElement;

    beforeEach(() => {
      const form = document.createElement("form");
      form.className = "card__data-entry";
      mockInput = document.createElement("input");
      mockSubmitBtn = document.createElement("button");
      mockSubmitBtn.textContent = "+";
      form.appendChild(mockInput);
      form.appendChild(mockSubmitBtn);
      document.body.appendChild(form);
    });

    it("should call itemStore.setEditingItem with the item id", async () => {
      const user = userEvent.setup();
      const mockSetEditingItem = jest.spyOn(itemStore, "setEditingItem");
      renderComponent();
      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      );
      expect(mockSetEditingItem).toHaveBeenCalledWith("1");
    });

    it("should populate the input with the item text", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      );
      expect(mockInput.value).toBe("Buy milk");
    });

    it("should change the submit button text to ✓", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      );
      expect(mockSubmitBtn.textContent).toBe("✓");
    });

    it("should not set editing state when item does not exist in store", async () => {
      const user = userEvent.setup();
      itemStore.setState({ items: [], idItemEdit: "" });
      const mockSetEditingItem = jest.spyOn(itemStore, "setEditingItem");
      renderComponent({ id: "ghost", text: "Ghost item" });
      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Ghost item"` })
      );
      expect(mockSetEditingItem).not.toHaveBeenCalled();
    });

    it("should not populate input when item does not exist in store", async () => {
      const user = userEvent.setup();
      itemStore.setState({ items: [], idItemEdit: "" });
      renderComponent({ id: "ghost", text: "Ghost item" });
      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Ghost item"` })
      );
      expect(mockInput.value).toBe("");
    });
  });

  describe("edit behavior without form elements", () => {
    it("should not set editing state when no input or button exists in the page", async () => {
      const user = userEvent.setup();
      const mockSetEditingItem = jest.spyOn(itemStore, "setEditingItem");
      renderComponent();
      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      );
      expect(mockSetEditingItem).not.toHaveBeenCalled();
    });
  });

  describe("cleanup", () => {
    it("should define a cleanup method", () => {
      const element = renderComponent();
      expect(element.cleanup).toBeDefined();
    });

    it("should not call deleteItemById after cleanup", async () => {
      const user = userEvent.setup();
      const mockDeleteItemById = jest.spyOn(itemStore, "deleteItemById");
      const element = renderComponent();
      element.cleanup?.();
      await user.click(
        screen.getByRole("button", { name: `Delete grocery item "Buy milk"` })
      );
      expect(mockDeleteItemById).not.toHaveBeenCalled();
    });
  });
});
