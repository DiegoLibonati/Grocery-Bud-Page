import "@/index.css";
import FreshlistPage from "@/pages/FreshlistPage/FreshlistPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const freshlistPage = FreshlistPage();
  app.appendChild(freshlistPage);
};

document.addEventListener("DOMContentLoaded", onInit);
