import { ErrorPage } from "../ErrorPage";
import { GiStopSign } from "react-icons/gi";
import { fireEvent, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ErrorPage.name} />`, () => {
  const history = createMemoryHistory();
  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <ErrorPage code={401} Icon={GiStopSign} />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("click on back btn redirects correctly", () => {
    const component = factoryComponent();

    fireEvent.click(component.getByTestId("error-page-btn"));

    expect(history.location.pathname).toBe("/home");
  });
});
