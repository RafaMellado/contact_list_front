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
import { useState as useStateMock } from "react";
import ContactBookService from "../../../Services/ContactBooksService";
import { ContactBook } from "../../../Services/Interfaces/ContactBook";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/ContactBooksService", () => ({
  index: () => [{ id: 1, name: "test", user_id: 1 }] as ContactBook[],
  delete: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe(`<${ContactBookIndex.name} />`, () => {
  const setState = jest.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation(() => [
      [{ id: 1, name: "test", user_id: 1 }],
      setState,
    ]);
  });

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

  test("add btn redirects to add contact book page", () => {
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

  test("click on card and go to show", () => {
    let component!: RenderResult;

    act(() => {
      component = factoryComponent();

      waitFor(() => {
        act(() => {
          expect(ContactBookService.index).toHaveBeenCalled();
        });
      });
    });

    fireEvent.click(component.getByTestId("contact-book-1"));

    expect(history.location.pathname).toBe("/contact-book/show/1");
  });

  test("click on card edit icon and go to show", () => {
    let component!: RenderResult;

    act(() => {
      component = factoryComponent();

      waitFor(() => {
        act(() => {
          expect(ContactBookService.index).toHaveBeenCalled();
        });
      });
    });

    fireEvent.click(component.getByTestId("contact-book-card-edit-icon"));

    expect(history.location.pathname).toBe("/contact-book/1/edit");
  });

  test("click on card delete icon and call delete", () => {
    let component!: RenderResult;

    act(() => {
      component = factoryComponent();

      waitFor(() => {
        act(() => {
          expect(ContactBookService.index).toHaveBeenCalled();
        });
      });
    });

    fireEvent.click(component.getByTestId("contact-book-card-delete-icon"));

    expect(ContactBookService.delete).toHaveBeenCalled();
  });
});
