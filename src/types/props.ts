interface DefaultProps {
  className?: string;
  children?: string;
}

export interface ButtonPrimaryProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent) => void;
}

export interface ItemProps {
  id: string;
  text: string;
}
