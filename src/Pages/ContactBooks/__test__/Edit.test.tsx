import { ContactBookEdit } from "../Edit";
import { act, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ContactBookEdit.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <ContactBookEdit />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
