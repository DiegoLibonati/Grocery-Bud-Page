import { getItemsFromLocalStorage } from "./getItemsFromLocalStorage";

import { LOCAL_STORAGE_ITEMS_KEY } from "../constants/constants";

import { mockLocalStorage } from "../../tests/jest.constants";

describe("getItemsFromLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called with key of cards.", () => {
      getItemsFromLocalStorage();

      expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_ITEMS_KEY
      );
    });
  });
});
