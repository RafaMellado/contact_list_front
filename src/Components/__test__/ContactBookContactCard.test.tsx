import { ContactBookContactCard } from "../ContactBookContactCard";
import { act, fireEvent, render } from "@testing-library/react";
import type { ContactBookContactCardProps } from "../ContactBookContactCard";

describe(`<${ContactBookContactCard.name} />`, () => {
  const contactBookContactCardProps: ContactBookContactCardProps = {
    item: {
      id: 1,
      givenname: "First",
      surname: "Second",
      email: "Test email",
      phone: "Test phone",
      contact_book_id: 1,
    },
    translations: "contactBooksShow",
    cardFn: jest.fn(),
    editFn: jest.fn(),
    deleteFn: jest.fn(),
  };

  const factoryComponent = (
    props: ContactBookContactCardProps = contactBookContactCardProps
  ) => render(<ContactBookContactCard {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("should execute cardFn function onClick", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId("contact-book-contact-card");

      fireEvent.click(element);
    });

    expect(contactBookContactCardProps.cardFn).toHaveBeenCalled();
  });

  test("should execute editFn function onClick", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId(
        "contact-book-contact-card-edit-icon"
      );

      fireEvent.click(element);
    });

    expect(contactBookContactCardProps.editFn).toHaveBeenCalled();
  });

  test("should execute deleteFn function onClick", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId(
        "contact-book-contact-card-delete-icon"
      );

      fireEvent.click(element);
    });

    expect(contactBookContactCardProps.deleteFn).toHaveBeenCalled();
  });
});
