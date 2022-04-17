import { ContactNew } from "../New";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ContactsService from "../../../Services/ContactsService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ contactBookId: 1 }),
}));

jest.mock("../../../Services/ContactsService");

const mockedContactService = ContactsService as jest.Mocked<
  typeof ContactsService
>;

describe(`<${ContactNew.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <ContactNew />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("click on backBtn form and redirects correctly", () => {
    const component = factoryComponent();

    fireEvent.click(component.getByTestId("contact-form-back-btn"));

    expect(history.location.pathname).toBe("/contact-book/show/1");
  });

  test("submit form calls addContact correctly", () => {
    const component = factoryComponent();

    fireEvent.submit(component.getByTestId("contact-form"));

    expect(mockedContactService.create).toHaveBeenCalledWith({
      contact_book_id: 1,
      email: "",
      givenname: "",
      phone: "",
      surname: "",
    });
  });

  test("submit form calls addContact correctly and set errors", async () => {
    mockedContactService.create.mockRejectedValue({
      errors: {
        email: [{ error: "email", value: "test" }],
        phone: [{ error: "phone", value: "test" }],
      },
    });

    const component = factoryComponent();

    fireEvent.submit(component.getByTestId("contact-form"));

    await waitFor(() => {
      expect(component.queryByTestId("error-box-email")).toBeTruthy();
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
