import { ContactForm, ContactFormProps } from "../Form";
import { act, fireEvent, render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ContactForm.name} />`, () => {
  const onSubmit = jest.fn();
  const onBack = jest.fn();

  const formItem = {
    givenname: "test",
    surname: "surname test",
    email: "test@email.es",
    phone: "12345",
  };

  const defaultProps: ContactFormProps = {
    translations: "test",
    onSubmit: onSubmit,
    onBack: onBack,
    item: {
      id: 1,
      contact_book_id: 1,
      ...formItem,
    },
  };

  const factoryComponent = (props: ContactFormProps = defaultProps) =>
    render(<ContactForm {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("submit calls onSubmit correctly", () => {
    const component = factoryComponent();

    fireEvent.submit(component.getByTestId("contact-form"));

    expect(onSubmit).toHaveBeenCalledWith(formItem);
  });

  test("click on backBtn redirects correctly", () => {
    const component = factoryComponent();

    fireEvent.click(component.getByTestId("contact-form-back-btn"));

    expect(onBack).toHaveBeenCalled();
  });

  test("show errors correctly", () => {
    const component = factoryComponent({
      ...defaultProps,
      errors: {
        errors: {
          email: [{ error: "email_error", value: "test value" }],
          phone: [{ error: "phone_error", value: "test value" }],
        },
      },
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
