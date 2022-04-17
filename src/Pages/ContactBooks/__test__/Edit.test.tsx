import { ContactBookEdit } from "../Edit";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ContactBooksService from "../../../Services/ContactBooksService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
}));

jest.mock("../../../Services/ContactBooksService");

const mockedContactBookService = ContactBooksService as jest.Mocked<
  typeof ContactBooksService
>;

describe(`<${ContactBookEdit.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = async () => {
    const component = render(
      <Router location="/" navigator={history}>
        <ContactBookEdit />
      </Router>
    );

    await waitFor(() => {
      expect(
        component.getByTestId("contact-book-edit-title")
      ).toBeInTheDocument();
    });

    return component;
  };

  beforeEach(() => {
    mockedContactBookService.show.mockResolvedValue({
      id: 1,
      name: "test",
      user_id: 1,
    });
  });

  test("renders correctly the component", async () => {
    const component = await factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("click on backFn btn redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-back-btn"));

    expect(history.location.pathname).toBe("/home");
  });

  test("submit form calls editContactBook correctly", async () => {
    const component = await factoryComponent();

    fireEvent.submit(component.getByTestId("contact-book-form"));

    expect(mockedContactBookService.update).toHaveBeenCalledWith(1, {
      name: "test",
    });
  });

  test("submit form calls editContactBook correctly and set errors", async () => {
    mockedContactBookService.update.mockRejectedValue({
      errors: {
        name: [{ error: "name", value: "test" }],
      },
    });

    const component = await factoryComponent();

    fireEvent.submit(component.getByTestId("contact-book-form"));

    await waitFor(() => {
      expect(component.queryByTestId("error-box-name")).toBeTruthy();
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
