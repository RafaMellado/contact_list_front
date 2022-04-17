import { ContactShow } from "../Show";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ContactsService from "../../../Services/ContactsService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
}));

jest.mock("../../../Services/ContactsService");

const mockedContactService = ContactsService as jest.Mocked<
  typeof ContactsService
>;

describe(`<${ContactShow.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = async () => {
    const component = render(
      <Router location="/" navigator={history}>
        <ContactShow />
      </Router>
    );

    await waitFor(() => {
      expect(component.getByTestId("contact-history-card")).toBeInTheDocument();
    });

    return component;
  };

  beforeEach(() => {
    mockedContactService.show.mockResolvedValue({
      id: 1,
      givenname: "test",
      surname: "surname test",
      email: "test@email.es",
      phone: "12345",
      contact_book_id: 1,
      contact_histories: [
        {
          givenname: "test",
          surname: "surname test",
          email: "test@email.es",
          phone: "12345",
          created_at: "",
        },
      ],
    });
  });

  test("renders correctly the component", async () => {
    const component = await factoryComponent();

    expect(ContactsService.show).toHaveBeenCalledWith(1);
    expect(component.asFragment()).toMatchSnapshot();
  });

  test("click on backBtn redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-show-back-btn"));

    expect(history.location.pathname).toBe("/contact-book/show/1");
  });

  test("click on editContact redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-show-edit-btn"));

    expect(history.location.pathname).toBe("/contact/1/edit");
  });
});
