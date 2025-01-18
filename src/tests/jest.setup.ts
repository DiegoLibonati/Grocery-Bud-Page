import "@testing-library/jest-dom";

import { mockLocalStorage } from "./jest.constants";

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mockLocalStorage.getItem,
    setItem: mockLocalStorage.setItem,
    clear: mockLocalStorage.clear,
  },
});
