import { ErrorBox, ErrorBoxProps } from "../ErrorBox";
import { act, render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ErrorBox.name} />`, () => {
  const errorBoxProps: ErrorBoxProps = {
    errors: {
      test: [{ error: "test" }],
    },
    field: "test",
  };

  const factoryComponent = (props: ErrorBoxProps = errorBoxProps) =>
    render(<ErrorBox {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
