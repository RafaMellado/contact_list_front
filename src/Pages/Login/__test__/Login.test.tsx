import { Login } from "../Login";
import { act, render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/AuthenticationService", () => ({
  login: jest.fn(),
}));

describe(`<${Login.name} />`, () => {
  const factoryComponent = () => render(<Login />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
