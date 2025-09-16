import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "@tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It should render the page title.", () => {
      const headingPage = screen.getByRole("heading", {
        name: /grocery items/i,
      });

      expect(headingPage).toBeInTheDocument();
    });

    test("It must render the input with your add button.", () => {
      const inputText = screen.getByRole("textbox");
      const btnAdd = screen.getByRole("button", { name: "add item" });

      expect(inputText).toBeInTheDocument();
      expect(btnAdd).toBeInTheDocument();
    });

    test("It must render the 'Clear All Items' button.", () => {
      const btnClearAllItems = screen.getByRole("button", {
        name: /clear all items/i,
      });

      expect(btnClearAllItems).toBeInTheDocument();
    });

    test("It must add an item when you add an item.", async () => {
      const value = "test123";

      const inputText = screen.getByRole("textbox");
      const btnAdd = screen.getByRole("button", { name: "add item" });
      const item = screen.queryByRole("heading", { name: value });

      expect(inputText).toBeInTheDocument();
      expect(btnAdd).toBeInTheDocument();
      expect(item).not.toBeInTheDocument();

      await user.clear(inputText);
      await user.click(inputText);
      await user.keyboard(value);

      await user.click(btnAdd);

      const newItem = screen.getByRole("heading", { name: value });

      expect(newItem).toBeInTheDocument();
    });

    test("It must edit an item when you edit an item.", async () => {
      const value = "test123";
      const newValue = "test1234";

      const inputText = screen.getByRole("textbox");
      const btnAdd = screen.getByRole("button", { name: "add item" });
      const item = screen.queryByRole("heading", { name: value });

      expect(inputText).toBeInTheDocument();
      expect(btnAdd).toBeInTheDocument();
      expect(btnAdd).toHaveTextContent("+");
      expect(item).not.toBeInTheDocument();

      await user.clear(inputText);
      await user.click(inputText);
      await user.keyboard(value);

      await user.click(btnAdd);

      const btnEdit = screen.getByRole("button", { name: /edit item/i });

      await user.click(btnEdit);

      expect(btnAdd).toHaveTextContent("✓");

      await user.clear(inputText);
      await user.click(inputText);
      await user.keyboard(newValue);

      await user.click(btnAdd);

      const itemEdited = screen.getByRole("heading", { name: newValue });

      expect(itemEdited).toBeInTheDocument();
    });

    test("It must delete an item when you click the delete button.", async () => {
      const value = "test123";

      const inputText = screen.getByRole("textbox");
      const btnAdd = screen.getByRole("button", { name: "add item" });
      const item = screen.queryByRole("heading", { name: value });

      expect(inputText).toBeInTheDocument();
      expect(btnAdd).toBeInTheDocument();
      expect(item).not.toBeInTheDocument();

      await user.clear(inputText);
      await user.click(inputText);
      await user.keyboard(value);

      await user.click(btnAdd);

      const newItem = screen.getByRole("heading", { name: value });

      expect(newItem).toBeInTheDocument();

      const btnDelete = screen.getByRole("button", { name: /delete item/i });

      await user.click(btnDelete);

      expect(newItem).not.toBeInTheDocument();
    });

    test("It should clear all existing items when 'Clear All Items' is clicked.", async () => {
      const value = "test123";

      const inputText = screen.getByRole("textbox");
      const btnAdd = screen.getByRole("button", { name: "add item" });
      const item = screen.queryByRole("heading", { name: value });

      expect(inputText).toBeInTheDocument();
      expect(btnAdd).toBeInTheDocument();
      expect(item).not.toBeInTheDocument();

      await user.clear(inputText);
      await user.click(inputText);
      await user.keyboard(value);

      await user.click(btnAdd);

      const newItem = screen.getByRole("heading", { name: value });

      expect(newItem).toBeInTheDocument();

      const btnClearAllItems = screen.getByRole("button", {
        name: /clear all items/i,
      });

      await user.click(btnClearAllItems);

      expect(newItem).not.toBeInTheDocument();
    });
  });
});
