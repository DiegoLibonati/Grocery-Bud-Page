import "@testing-library/jest-dom";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mocksLocalStorage.getItem,
    setItem: mocksLocalStorage.setItem,
    removeItem: mocksLocalStorage.removeItem,
    clear: mocksLocalStorage.clear,
    key: mocksLocalStorage.key,
    length: mocksLocalStorage.length,
  },
  writable: true,
});

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid-1234"),
}));
