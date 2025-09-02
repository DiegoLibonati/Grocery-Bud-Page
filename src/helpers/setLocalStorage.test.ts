import { setLocalStorage } from "./setLocalStorage";

import { mockLocalStorage } from "../../tests/jest.constants";

describe("setLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The setItem of localStorage must be called.", () => {
      setLocalStorage("key", 2);

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("key", "2");
    });
  });
});
