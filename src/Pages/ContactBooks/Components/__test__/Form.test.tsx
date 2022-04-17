import { ContactBookForm, ContactBookFormProps } from "../Form";
import { fireEvent, render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ContactBookForm.name} />`, () => {
  const onSubmit = jest.fn();
  const onBack = jest.fn();

  const defaultProps: ContactBookFormProps = {
    translations: "test",
    onSubmit: onSubmit,
    onBack: onBack,
    item: {
      id: 1,
      name: "test",
      user_id: 1,
    },
  };

  const factoryComponent = (props: ContactBookFormProps = defaultProps) =>
    render(<ContactBookForm {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("submit calls onSubmit correctly", () => {
    const component = factoryComponent();

    fireEvent.submit(component.getByTestId("contact-book-form"));

    expect(onSubmit).toHaveBeenCalledWith({ name: "test" });
  });

  test("click on onBack redirects correctly", () => {
    const component = factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-back-btn"));

    expect(onBack).toHaveBeenCalled();
  });

  test("show errors correctly", () => {
    const component = factoryComponent({
      ...defaultProps,
      errors: { errors: { name: [{ error: "test", value: "test value" }] } },
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
