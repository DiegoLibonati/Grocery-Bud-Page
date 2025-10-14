import { GroceryBudPage } from "@src/pages/GroceryBudPage/GroceryBudPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const groceryBudPage = GroceryBudPage();
  app.appendChild(groceryBudPage);
};

document.addEventListener("DOMContentLoaded", onInit);
