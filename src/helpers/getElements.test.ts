import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { btnAddData, btnClearAllItems, containerShowItems, inputDataEntry } =
    getElements();

  expect(btnAddData).toBeInTheDocument();
  expect(btnClearAllItems).toBeInTheDocument();
  expect(containerShowItems).toBeInTheDocument();
  expect(inputDataEntry).toBeInTheDocument();
});
