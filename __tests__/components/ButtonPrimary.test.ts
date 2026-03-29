import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonPrimaryProps } from "@/types/props";
import type { ButtonPrimaryComponent } from "@/types/components";

import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary";

const renderComponent = (props: ButtonPrimaryProps): ButtonPrimaryComponent => {
  const container = ButtonPrimary(props);
  document.body.appendChild(container);
  return container;
};

describe("ButtonPrimary Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ButtonPrimaryProps = {
    id: "test-button",
    ariaLabel: "Test button",
    children: "Click Me",
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-button");
    expect(button.innerHTML).toBe("Click Me");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should render submit button when type is submit", () => {
    const submitProps: ButtonPrimaryProps = {
      ...defaultProps,
      type: "submit",
    };

    renderComponent(submitProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: ButtonPrimaryProps = {
      ...defaultProps,
      className: "custom-class",
    };

    renderComponent(propsWithClass);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveClass("custom-class");
  });

  it("should not add event listener for submit button", () => {
    const submitProps: ButtonPrimaryProps = {
      ...defaultProps,
      type: "submit",
    };

    const button = renderComponent(submitProps);

    expect(button.cleanup).toBeUndefined();
  });

  it("should cleanup event listener for button type", async () => {
    const user = userEvent.setup();
    const button = renderComponent(defaultProps);

    button.cleanup?.();

    const buttonElement = screen.getByRole("button", { name: "Test button" });
    await user.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
