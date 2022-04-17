import { ContactBookShow } from "../Show";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ContactsService from "../../../Services/ContactsService";
import ContactBooksService from "../../../Services/ContactBooksService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
}));

jest.mock("../../../Services/ContactBooksService");
jest.mock("../../../Services/ContactsService");

const mockedContactService = ContactsService as jest.Mocked<
  typeof ContactsService
>;
const mockedContactBookService = ContactBooksService as jest.Mocked<
  typeof ContactBooksService
>;

describe(`<${ContactBookShow.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = async () => {
    const component = render(
      <Router location="/" navigator={history}>
        <ContactBookShow />
      </Router>
    );

    await waitFor(() => {
      expect(
        component.getByTestId("contact-book-contact-card")
      ).toBeInTheDocument();
    });

    return component;
  };

  beforeEach(() => {
    mockedContactService.index.mockResolvedValue([
      {
        id: 1,
        givenname: "test",
        surname: "surname test",
        email: "test@email.es",
        phone: "12345",
        contact_book_id: 1,
      },
    ]);

    mockedContactBookService.show.mockResolvedValue({
      id: 1,
      name: "test",
      user_id: 1,
    });
  });

  test("renders correctly the component", async () => {
    const component = await factoryComponent();

    expect(ContactsService.index).toHaveBeenCalledWith({
      filter: { contact_book_id: 1 },
    });
    expect(ContactBooksService.show).toHaveBeenCalledWith(1);

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("click on backBtn btn redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-show-back-btn"));

    expect(history.location.pathname).toBe("/home");
  });

  test("click on addContact btn redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-show-contact-btn"));

    expect(history.location.pathname).toBe("/contact-book/1/contact/new");
  });

  test("click on goToContactShow btn redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-contact-card"));

    expect(history.location.pathname).toBe("/contact/1");
  });

  test("click on goToEditContact icon redirects correctly", async () => {
    const component = await factoryComponent();

    fireEvent.click(
      component.getByTestId("contact-book-contact-card-edit-icon")
    );

    expect(history.location.pathname).toBe("/contact/1/edit");
  });

  test("click on deleteContact icon delete item correctly", async () => {
    const component = await factoryComponent();

    expect(
      component.getByTestId("contact-book-contact-card")
    ).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(
        component.getByTestId("contact-book-contact-card-delete-icon")
      );
    });

    expect(ContactsService.delete).toHaveBeenCalledWith(1);

    expect(component.queryByTestId("contact-book-contact-card")).toBeNull();
  });
});
