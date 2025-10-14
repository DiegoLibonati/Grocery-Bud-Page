import { ButtonPrimaryProps } from "@src/entities/props";

export const ButtonPrimary = ({
  id,
  ariaLabel,
  type,
  children,
  className,
  onClick,
}: ButtonPrimaryProps): HTMLButtonElement => {
  const button = document.createElement("button");

  button.className = `cursor-pointer bg-primary hover:bg-opacity-75 active:scale-75 transition-all ${
    className ?? ""
  }`;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";
  button.type = type ?? "button";

  if (button.type === "button" && onClick)
    button.addEventListener("click", onClick);

  return button;
};
