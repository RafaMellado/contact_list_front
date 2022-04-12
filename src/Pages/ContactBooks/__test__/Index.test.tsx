import { ContactBookIndex } from "../Index";
import { createMemoryHistory } from "history";
import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { Router } from "react-router-dom";
import ContactBookService from "../../../Services/ContactBooksService";
import { ContactBook } from "../../../Services/Interfaces/ContactBook";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/ContactBooksService", () => ({
  index: () => [{ id: 1, name: "test", user_id: 1 }],
}));

describe(`<${ContactBookIndex.name} />`, () => {
  const history = createMemoryHistory();
  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <ContactBookIndex />
      </Router>
    );

  test("renders correctly the component", () => {
    let component!: RenderResult;

    act(() => {
      component = factoryComponent();

      waitFor(() => {
        act(() => {
          expect(ContactBookService.index).toHaveBeenCalled();
        });
      });
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  test.only("add btn redirects to add contact book page", () => {
    let component!: RenderResult;

    act(() => {
      component = factoryComponent();

      waitFor(() => {
        act(() => {
          expect(ContactBookService.index).toHaveBeenCalled();
        });
      });
    });

    fireEvent.click(component.getByTestId("contact-book-add-btn"));

    expect(history.location.pathname).toBe("/contact-book/new");
  });
});
