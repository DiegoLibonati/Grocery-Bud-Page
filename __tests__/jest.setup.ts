import "@testing-library/jest-dom";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";

const mockUuidV4 = jest.fn(() => "mocked-uuid-1234");

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mockLocalStorage.getItem,
    setItem: mockLocalStorage.setItem,
    removeItem: mockLocalStorage.removeItem,
    clear: mockLocalStorage.clear,
    key: mockLocalStorage.key,
    length: mockLocalStorage.length,
  },
  writable: true,
});

jest.mock("uuid", () => ({
  v4: mockUuidV4,
}));
