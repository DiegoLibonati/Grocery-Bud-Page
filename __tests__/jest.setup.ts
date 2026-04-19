import "@testing-library/jest-dom";

const mockUuidV4 = jest.fn(() => "mocked-uuid-1234");

jest.mock("uuid", () => ({
  v4: mockUuidV4,
}));
