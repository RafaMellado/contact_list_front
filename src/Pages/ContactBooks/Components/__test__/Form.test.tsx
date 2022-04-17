import { ContactBookForm, ContactBookFormProps } from "../Form";
import { fireEvent, render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ContactBookForm.name} />`, () => {
  const submitFn = jest.fn();
  const backFn = jest.fn();

  const defaultProps: ContactBookFormProps = {
    translations: "test",
    submitFn: submitFn,
    backFn: backFn,
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

  test("submit calls submitFn correctly", () => {
    const component = factoryComponent();

    fireEvent.submit(component.getByTestId("contact-book-form"));

    expect(submitFn).toHaveBeenCalledWith({ name: "test" });
  });

  test("click on backBtn redirects correctly", () => {
    const component = factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-back-btn"));

    expect(backFn).toHaveBeenCalled();
  });

  test("show errors correctly", () => {
    const component = factoryComponent({
      ...defaultProps,
      errors: { errors: { name: [{ error: "test", value: "test value" }] } },
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
