import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ButtonPrimaryProps } from "@src/entities/props";

import { ButtonPrimary } from "@src/components/ButtonPrimary/ButtonPrimary";

type RenderComponent = {
  props: { onClick: jest.Mock } & ButtonPrimaryProps;
  container: HTMLButtonElement;
};

const renderComponent = (
  id: string,
  ariaLabel: string,
  type?: "button" | "submit" | "reset",
  children?: string,
  className?: string,
  onClick?: jest.Mock
): RenderComponent => {
  const props = {
    id: id,
    ariaLabel: ariaLabel,
    type: type,
    children: children,
    className: className,
    onClick: onClick ?? jest.fn(),
  };

  const container = ButtonPrimary({
    id: props.id,
    ariaLabel: props.ariaLabel,
    type: props.type,
    children: props.children,
    className: props.className,
    onClick: props.onClick,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("ButtonPrimary.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const props = {
      id: "test-button",
      ariaLabel: "Test primary button",
      children: "Click me",
      className: "custom-class",
    };

    test("It should create a button element with correct attributes", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        undefined,
        props.children,
        props.className
      );

      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.id).toBe(props.id);
      expect(container.getAttribute("aria-label")).toBe(props.ariaLabel);
      expect(container.innerHTML).toBe(props.children);
      expect(container.type).toBe("button");
    });

    test("It should be accessible via screen.getByRole", () => {
      renderComponent(props.id, props.ariaLabel, undefined, props.children);

      const button = screen.getByRole("button", { name: props.ariaLabel });

      expect(button).toBeInTheDocument();
      expect(button.innerHTML).toBe(props.children);
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        undefined,
        props.children
      );

      expect(container.className).toContain("cursor-pointer");
      expect(container.className).toContain("bg-primary");
      expect(container.className).toContain("hover:bg-opacity-75");
      expect(container.className).toContain("active:scale-75");
      expect(container.className).toContain("transition-all");
    });

    test("It should append custom className when provided", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        undefined,
        props.children,
        props.className
      );

      expect(container.className).toContain(props.className);
      expect(container.className).toContain("bg-primary");
    });

    test("It should work without custom className", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        undefined,
        props.children
      );

      expect(container.className).toBe(
        "cursor-pointer bg-primary hover:bg-opacity-75 active:scale-75 transition-all "
      );
    });

    test("It should work without children content", () => {
      const { container } = renderComponent(props.id, props.ariaLabel);

      expect(container.innerHTML).toBe("");
      expect(container).toBeInstanceOf(HTMLButtonElement);
    });

    test("It should default to button type when type is not provided", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        undefined,
        props.children
      );

      expect(container.type).toBe("button");
    });

    test("It should set submit type when provided", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        "submit",
        props.children
      );

      expect(container.type).toBe("submit");
    });

    test("It should set reset type when provided", () => {
      const { container } = renderComponent(
        props.id,
        props.ariaLabel,
        "reset",
        props.children
      );

      expect(container.type).toBe("reset");
    });
  });

  describe("Click interactions", () => {
    test("It should call onClick handler when clicked", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "primary-button",
        "Primary button",
        undefined,
        "Click",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /primary button/i });

      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("It should call onClick handler multiple times", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "primary-button",
        "Primary button",
        undefined,
        "Click",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /primary button/i });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    test("It should pass event object to onClick handler", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "primary-button",
        "Primary button",
        undefined,
        "Click",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /primary button/i });

      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    test("It should not attach onClick listener when type is submit", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "submit-button",
        "Submit button",
        "submit",
        "Submit",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /submit button/i });

      await user.click(button);

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    test("It should not attach onClick listener when type is reset", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "reset-button",
        "Reset button",
        "reset",
        "Reset",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /reset button/i });

      await user.click(button);

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("Content rendering", () => {
    test("It should render text content correctly", () => {
      const { container } = renderComponent(
        "text-button",
        "Text button",
        undefined,
        "Simple text"
      );

      expect(container.innerHTML).toBe("Simple text");
    });

    test("It should render HTML content correctly", () => {
      const htmlContent = '<span class="icon">🔔</span> Notify';
      const { container } = renderComponent(
        "html-button",
        "HTML button",
        undefined,
        htmlContent
      );

      expect(container.innerHTML).toBe(htmlContent);
      expect(
        container.querySelector<HTMLSpanElement>(".icon")
      ).toBeInTheDocument();
    });

    test("It should render SVG content correctly", () => {
      const svgContent = '<svg width="20" height="20"><circle r="10"/></svg>';
      const { container } = renderComponent(
        "svg-button",
        "SVG button",
        undefined,
        svgContent
      );

      expect(container.querySelector<HTMLElement>("svg")).toBeInTheDocument();
      expect(
        container.querySelector<HTMLElement>("circle")
      ).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty string as children", () => {
      const { container } = renderComponent(
        "empty-button",
        "Empty button",
        undefined,
        ""
      );

      expect(container.innerHTML).toBe("");
    });

    test("It should handle empty string as className", () => {
      const { container } = renderComponent(
        "test-button",
        "Test button",
        undefined,
        "Text",
        ""
      );

      expect(container.className).toBe(
        "cursor-pointer bg-primary hover:bg-opacity-75 active:scale-75 transition-all "
      );
    });

    test("It should handle multiple custom classes", () => {
      const { container } = renderComponent(
        "multi-class-button",
        "Multi class button",
        undefined,
        "Text",
        "custom-1 custom-2 custom-3"
      );

      expect(container.className).toContain("custom-1");
      expect(container.className).toContain("custom-2");
      expect(container.className).toContain("custom-3");
    });

    test("It should maintain button functionality with complex content", () => {
      const mockOnClick = jest.fn();
      const complexContent = "<div><span>Icon</span><span>Label</span></div>";
      renderComponent(
        "complex-button",
        "Complex button",
        undefined,
        complexContent,
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /complex button/i });

      expect(button.querySelector<HTMLDivElement>("div")).toBeInTheDocument();
      expect(button.querySelectorAll<HTMLSpanElement>("span")).toHaveLength(2);
    });
  });
});
