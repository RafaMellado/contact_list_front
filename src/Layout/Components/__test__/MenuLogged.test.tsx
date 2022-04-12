import { MenuLogged } from "../MenuLogged";
import { act, fireEvent, render } from "@testing-library/react";
import type { MenuLoggedProps } from "../MenuLogged";
import AuthenticationService from "../../../Services/AuthenticationService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/AuthenticationService", () => ({
  logout: jest.fn(),
}));

describe(`<${MenuLogged.name} />`, () => {
  const menuLoggedProps: MenuLoggedProps = {
    translations: "contactHistory",
  };

  const factoryComponent = (props: MenuLoggedProps = menuLoggedProps) =>
    render(<MenuLogged {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("should execute logout function onClick", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId("menu-logged-logout-btn");

      fireEvent.click(element);
    });

    expect(AuthenticationService.logout).toHaveBeenCalled();
  });
});
