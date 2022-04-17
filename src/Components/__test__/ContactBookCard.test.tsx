import { ContactBookCard } from "../ContactBookCard";
import { act, fireEvent, render } from "@testing-library/react";
import type { ContactBookCardProps } from "../ContactBookCard";

describe(`<${ContactBookCard.name} />`, () => {
  const contactBookCardProps: ContactBookCardProps = {
    name: "test",
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  const factoryComponent = (
    props: ContactBookCardProps = contactBookCardProps
  ) => render(<ContactBookCard {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("should execute onEdit function onClick", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId("contact-book-card-edit-icon");

      fireEvent.click(element);
    });

    expect(contactBookCardProps.onEdit).toHaveBeenCalled();
  });

  test("should execute onDelete function onClick", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId("contact-book-card-delete-icon");

      fireEvent.click(element);
    });

    expect(contactBookCardProps.onDelete).toHaveBeenCalled();
  });
});
