import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { mockLocalStorage } from "@tests/jest.constants";

describe("getLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called.", () => {
      getLocalStorage("key");

      expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("key");
    });
  });
});
