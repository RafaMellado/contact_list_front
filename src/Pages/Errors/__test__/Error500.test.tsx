import { Error500 } from "../Error500";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${Error500.name} />`, () => {
  const history = createMemoryHistory();
  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <Error500 />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });
});
