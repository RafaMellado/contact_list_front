import { MenuUnlogged } from "../MenuUnlogged";
import { act, fireEvent, render } from "@testing-library/react";
import type { MenuUnloggedProps } from "../MenuUnlogged";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${MenuUnlogged.name} />`, () => {
  const history = createMemoryHistory();

  const menuUnloggedProps: MenuUnloggedProps = {
    translations: "contactHistory",
  };

  const factoryComponent = (props: MenuUnloggedProps = menuUnloggedProps) =>
    render(
      <Router location="/" navigator={history}>
        <MenuUnlogged {...props} />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("navigate to sign up when click btn", () => {
    const component = factoryComponent();

    act(() => {
      const element = component.getByTestId("menu-unlogged-btn");

      fireEvent.click(element);
    });

    expect(history.location.pathname).toBe("/sign-up");
  });
});
