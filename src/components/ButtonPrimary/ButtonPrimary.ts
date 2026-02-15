import type { ButtonPrimaryProps } from "@/types/props";
import type { ButtonPrimaryComponent } from "@/types/components";

export const ButtonPrimary = ({
  id,
  ariaLabel,
  type,
  children,
  className,
  onClick,
}: ButtonPrimaryProps): ButtonPrimaryComponent => {
  const button = document.createElement("button") as ButtonPrimaryComponent;

  button.className = `cursor-pointer bg-primary hover:bg-opacity-75 active:scale-75 transition-all ${
    className ?? ""
  }`;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";
  button.type = type ?? "button";

  if (button.type === "button" && onClick) {
    button.addEventListener("click", onClick);

    button.cleanup = (): void => {
      button.removeEventListener("click", onClick);
    };
  }

  return button;
};
