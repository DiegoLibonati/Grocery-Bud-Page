import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import FreshlistPage from "@/pages/FreshlistPage/FreshlistPage";

import { itemStore } from "@/stores/itemStore";

let page: Page;

const renderPage = (): Page => {
  page = FreshlistPage();
  document.body.appendChild(page);
  return page;
};

describe("FreshlistPage", () => {
  beforeEach(() => {
    localStorage.clear();
    itemStore.setState({ items: [], idItemEdit: "" });
  });

  afterEach(() => {
    page.cleanup?.();
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByText("GROCERY ITEMS")).toBeInTheDocument();
    });

    it("should render a text input", () => {
      renderPage();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render the add button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Add grocery item" })
      ).toBeInTheDocument();
    });

    it("should render the clear all items button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Clear all grocery items" })
      ).toBeInTheDocument();
    });

    it("should render an empty list when store has no items", () => {
      renderPage();
      const list =
        document.querySelector<HTMLUListElement>(".card__items-list");
      expect(list?.children.length).toBe(0);
    });

    it("should render items from the store on mount", () => {
      itemStore.setState({
        items: [{ id: "1", text: "Buy milk" }],
        idItemEdit: "",
      });
      renderPage();
      expect(screen.getByText("Buy milk")).toBeInTheDocument();
    });
  });

  describe("adding items", () => {
    it("should add an item to the list when input has value and form is submitted", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByRole("textbox"), "Buy eggs");
      await user.click(
        screen.getByRole("button", { name: "Add grocery item" })
      );
      expect(screen.getByText("Buy eggs")).toBeInTheDocument();
    });

    it("should clear the input after adding an item", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByRole("textbox"), "Buy eggs");
      await user.click(
        screen.getByRole("button", { name: "Add grocery item" })
      );
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("should not add an item when input is empty", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Add grocery item" })
      );
      const list =
        document.querySelector<HTMLUListElement>(".card__items-list");
      expect(list?.children.length).toBe(0);
    });

    it("should not add an item when input contains only whitespace", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByRole("textbox"), "   ");
      await user.click(
        screen.getByRole("button", { name: "Add grocery item" })
      );
      const list =
        document.querySelector<HTMLUListElement>(".card__items-list");
      expect(list?.children.length).toBe(0);
    });
  });

  describe("editing items", () => {
    it("should update item text after the full edit flow", async () => {
      const user = userEvent.setup();
      itemStore.setState({
        items: [{ id: "1", text: "Buy milk" }],
        idItemEdit: "",
      });
      renderPage();

      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      );

      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "Buy almond milk");
      await user.click(
        screen.getByRole("button", { name: "Add grocery item" })
      );

      expect(screen.getByText("Buy almond milk")).toBeInTheDocument();
      expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
    });

    it("should restore the add button text to + after editing", async () => {
      const user = userEvent.setup();
      itemStore.setState({
        items: [{ id: "1", text: "Buy milk" }],
        idItemEdit: "",
      });
      renderPage();

      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      );

      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "Buy almond milk");
      await user.click(
        screen.getByRole("button", { name: "Add grocery item" })
      );

      expect(
        screen.getByRole("button", { name: "Add grocery item" })
      ).toHaveTextContent("+");
    });

    it("should clear the input after editing", async () => {
      const user = userEvent.setup();
      itemStore.setState({
        items: [{ id: "1", text: "Buy milk" }],
        idItemEdit: "",
      });
      renderPage();

      await user.click(
        screen.getByRole("button", { name: `Edit grocery item "Buy milk"` })
      );

      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "Buy almond milk");
      await user.click(
        screen.getByRole("button", { name: "Add grocery item" })
      );

      expect(input).toHaveValue("");
    });
  });

  describe("deleting items", () => {
    it("should remove an item when the delete button is clicked", async () => {
      const user = userEvent.setup();
      itemStore.setState({
        items: [{ id: "1", text: "Buy milk" }],
        idItemEdit: "",
      });
      renderPage();

      await user.click(
        screen.getByRole("button", { name: `Delete grocery item "Buy milk"` })
      );

      expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
    });
  });

  describe("clearing items", () => {
    it("should remove all items when clear all is clicked", async () => {
      const user = userEvent.setup();
      itemStore.setState({
        items: [
          { id: "1", text: "Buy milk" },
          { id: "2", text: "Buy bread" },
        ],
        idItemEdit: "",
      });
      renderPage();

      await user.click(
        screen.getByRole("button", { name: "Clear all grocery items" })
      );

      const list =
        document.querySelector<HTMLUListElement>(".card__items-list");
      expect(list?.children.length).toBe(0);
    });
  });

  describe("cleanup", () => {
    it("should define a cleanup method", () => {
      renderPage();
      expect(page.cleanup).toBeDefined();
    });

    it("should unsubscribe from the store on cleanup so new items are not rendered", () => {
      renderPage();
      page.cleanup?.();

      itemStore.addItem({ id: "99", text: "Ghost item" });

      expect(screen.queryByText("Ghost item")).not.toBeInTheDocument();
    });
  });
});
