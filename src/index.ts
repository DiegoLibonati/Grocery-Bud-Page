import "@/index.css";
import GroceryBudPage from "@/pages/GroceryBudPage/GroceryBudPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const groceryBudPage = GroceryBudPage();
  app.appendChild(groceryBudPage);
};

document.addEventListener("DOMContentLoaded", onInit);
