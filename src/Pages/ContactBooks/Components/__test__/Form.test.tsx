import { ContactBookForm } from "../Form";
import { act, render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ContactBookForm.name} />`, () => {
  const factoryComponent = () =>
    render(
      <ContactBookForm
        translations={""}
        submitFn={jest.fn()}
        backFn={jest.fn()}
      />
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
