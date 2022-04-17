import { ContactBookNew } from "../New";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ContactBooksService from "../../../Services/ContactBooksService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/ContactBooksService");

const mockedContactBooksService = ContactBooksService as jest.Mocked<
  typeof ContactBooksService
>;

describe(`<${ContactBookNew.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <ContactBookNew />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("click on backBtn form and redirects correctly", () => {
    const component = factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-back-btn"));

    expect(history.location.pathname).toBe("/home");
  });

  test("submit form calls addContact correctly", () => {
    const component = factoryComponent();

    fireEvent.submit(component.getByTestId("contact-book-form"));

    expect(mockedContactBooksService.create).toHaveBeenCalledWith({
      name: "",
    });
  });

  test("submit form calls addContact correctly and set errors", async () => {
    mockedContactBooksService.create.mockRejectedValue({
      errors: {
        name: [{ error: "name", value: "test" }],
      },
    });

    const component = factoryComponent();

    fireEvent.submit(component.getByTestId("contact-book-form"));

    await waitFor(() => {
      expect(component.queryByTestId("error-box-name")).toBeTruthy();
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
