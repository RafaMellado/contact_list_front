import { ContactBookIndex } from "../Index";
import { createMemoryHistory } from "history";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import ContactBookService from "../../../Services/ContactBooksService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/ContactBooksService", () => ({
  index: jest.fn(),
  delete: jest.fn(),
}));

const mockedContactBookService = ContactBookService as jest.Mocked<
  typeof ContactBookService
>;

describe(`<${ContactBookIndex.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = async () => {
    const component = render(
      <Router location="/" navigator={history}>
        <ContactBookIndex />
      </Router>
    );

    await waitFor(() => {
      expect(component.getByTestId("contact-book-1")).toBeInTheDocument();
    });

    return component;
  };

  beforeEach(() => {
    mockedContactBookService.index.mockResolvedValue([
      {
        id: 1,
        name: "test",
        user_id: 1,
      },
    ]);
  });

  test("renders correctly the component", async () => {
    const component = await factoryComponent();

    expect(ContactBookService.index).toHaveBeenCalled();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("add btn redirects to add contact book page", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-add-btn"));

    expect(history.location.pathname).toBe("/contact-book/new");
  });

  test("click on card and go to show", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-1"));

    expect(history.location.pathname).toBe("/contact-book/show/1");
  });

  test("click on card edit icon and go to show", async () => {
    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("contact-book-card-edit-icon"));

    expect(history.location.pathname).toBe("/contact-book/1/edit");
  });

  test("click on card delete icon and call delete", async () => {
    const component = await factoryComponent();

    expect(component.getByTestId("contact-book-1")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(component.getByTestId("contact-book-card-delete-icon"));
    });

    expect(ContactBookService.delete).toHaveBeenCalled();

    expect(component.queryByTestId("contact-book-1")).toBeNull();
  });
});
