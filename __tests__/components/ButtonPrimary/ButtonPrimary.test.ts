import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonPrimaryProps } from "@/types/props";
import type { ButtonPrimaryComponent } from "@/types/components";

import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary";

const mockOnClick = jest.fn();

const defaultProps: ButtonPrimaryProps = {
  id: "btn-primary",
  ariaLabel: "Primary button",
  children: "Click me",
  className: "my-class",
  onClick: mockOnClick,
};

const renderComponent = (
  props: Partial<ButtonPrimaryProps> = {}
): ButtonPrimaryComponent => {
  const element = ButtonPrimary({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("ButtonPrimary", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("id", "btn-primary");
    });

    it("should set the aria-label attribute", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Primary button" })
      ).toBeInTheDocument();
    });

    it("should render children as innerHTML", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("should include the provided className", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("my-class");
    });

    it("should always include base Tailwind classes", () => {
      renderComponent();
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("cursor-pointer", "bg-primary", "transition-all");
    });

    it("should default to type button when type is not provided", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should set type submit when specified", () => {
      renderComponent({ type: "submit" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("should render empty content when children is not provided", () => {
      const element = ButtonPrimary({ id: "btn", ariaLabel: "btn" });
      document.body.appendChild(element);
      expect(screen.getByRole("button")).toHaveTextContent("");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when type is submit", async () => {
      const user = userEvent.setup();
      renderComponent({ type: "submit" });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should not throw when onClick is not provided and type is button", async () => {
      const user = userEvent.setup();
      const element = ButtonPrimary({ id: "btn", ariaLabel: "btn" });
      document.body.appendChild(element);
      await expect(
        user.click(screen.getByRole("button"))
      ).resolves.not.toThrow();
    });
  });

  describe("cleanup", () => {
    it("should define a cleanup method when type is button and onClick is provided", () => {
      const element = renderComponent();
      expect(element.cleanup).toBeDefined();
    });

    it("should not define cleanup when type is submit", () => {
      const element = renderComponent({ type: "submit" });
      expect(element.cleanup).toBeUndefined();
    });

    it("should not define cleanup when onClick is not provided", () => {
      const element = ButtonPrimary({ id: "btn", ariaLabel: "btn" });
      document.body.appendChild(element);
      expect(element.cleanup).toBeUndefined();
    });

    it("should stop calling onClick after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup?.();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
