import { ContactBookContactCard } from "../ContactBookContactCard";
import { act, fireEvent, render } from "@testing-library/react";
import type { ContactBookContactCardProps } from "../ContactBookContactCard";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

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
    onClick: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
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

  test("should execute onClick function when click card", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId("contact-book-contact-card");

      fireEvent.click(element);
    });

    expect(contactBookContactCardProps.onClick).toHaveBeenCalled();
  });

  test("should execute onEdit function when click on edit icon", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId(
        "contact-book-contact-card-edit-icon"
      );

      fireEvent.click(element);
    });

    expect(contactBookContactCardProps.onEdit).toHaveBeenCalled();
  });

  test("should execute onDelete function when click on delete icon", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId(
        "contact-book-contact-card-delete-icon"
      );

      fireEvent.click(element);
    });

    expect(contactBookContactCardProps.onDelete).toHaveBeenCalled();
  });
});
