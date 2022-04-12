import { ContactForm } from "../Form";
import { act, render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ContactForm.name} />`, () => {
  const factoryComponent = () =>
    render(
      <ContactForm
        translations={""}
        submitFn={jest.fn()}
        backToListFn={jest.fn()}
      />
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
