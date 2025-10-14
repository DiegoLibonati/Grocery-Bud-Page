import { getItemsFromLocalStorage } from "@src/helpers/getItemsFromLocalStorage";

import { LOCAL_STORAGE_ITEMS_KEY } from "@src/constants/vars";

import { mockLocalStorage } from "@tests/jest.constants";

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
