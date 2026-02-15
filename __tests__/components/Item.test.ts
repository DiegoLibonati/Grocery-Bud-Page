import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ItemProps } from "@/types/props";
import type { ItemComponent } from "@/types/components";

import { Item } from "@/components/Item/Item";

import { itemStore } from "@/stores/itemStore";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";

const renderComponent = (props: ItemProps): ItemComponent => {
  const container = Item(props);
  document.body.appendChild(container);
  return container;
};

describe("Item Component", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
    itemStore.setItems([]);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    mocksLocalStorage.clear();
    itemStore.setItems([]);
  });

  const defaultProps: ItemProps = {
    id: "item-1",
    text: "Buy groceries",
  };

  it("should render item with correct structure", () => {
    renderComponent(defaultProps);

    const item = document.querySelector<HTMLLIElement>(".card__item");
    expect(item).toBeInTheDocument();
    expect(item?.tagName).toBe("LI");
    expect(item).toHaveAttribute("id", "item-1");
  });

  it("should render item text", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
  });

  it("should render delete and edit buttons", () => {
    renderComponent(defaultProps);

    expect(
      screen.getByRole("button", { name: "delete item item-1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "edit item item-1" })
    ).toBeInTheDocument();
  });

  it("should delete item when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockItems = [defaultProps];
    itemStore.setItems(mockItems);

    renderComponent(defaultProps);

    const deleteButton = screen.getByRole("button", {
      name: "delete item item-1",
    });
    await user.click(deleteButton);

    expect(itemStore.get("items")).toEqual([]);
  });

  it("should cleanup button listeners", () => {
    const item = renderComponent(defaultProps);

    expect(item.cleanup).toBeDefined();
    item.cleanup?.();

    expect(item.cleanup).toBeDefined();
  });
});
