import { ContactEdit } from "../Edit";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ContactsService from "../../../Services/ContactsService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 10 }),
}));

jest.mock("../../../Services/ContactsService");

const mockedContactService = ContactsService as jest.Mocked<
  typeof ContactsService
>;

describe(`<${ContactEdit.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = async () => {
    const component = render(
      <Router location="/" navigator={history}>
        <ContactEdit />
      </Router>
    );

    await waitFor(() => {
      expect(component.getByTestId("contact-edit-title")).toBeInTheDocument();
    });

    return component;
  };

  const formItemData = {
    givenname: "test",
    surname: "test surname",
    email: "test@email.com",
    phone: "1234",
    contact_book_id: 1,
  };

  beforeEach(() => {
    mockedContactService.show.mockResolvedValue({
      id: 10,
      contact_histories: [],
      ...formItemData,
    });
  });

  test("renders correctly the component", async () => {
    const component = await factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("click on backFn btn redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-form-back-btn"));

    expect(history.location.pathname).toBe("/contact-book/show/1");
  });

  test("submit form calls editContact correctly", async () => {
    const component = await factoryComponent();

    fireEvent.submit(component.getByTestId("contact-form"));

    expect(mockedContactService.update).toHaveBeenCalledWith(10, formItemData);
  });

  test("submit form calls editContact correctly and set errors", async () => {
    mockedContactService.update.mockRejectedValue({
      errors: {
        email: [{ error: "email", value: "test" }],
        phone: [{ error: "phone", value: "test" }],
      },
    });

    const component = await factoryComponent();

    fireEvent.submit(component.getByTestId("contact-form"));

    await waitFor(() => {
      expect(component.queryByTestId("error-box-email")).toBeTruthy();
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
