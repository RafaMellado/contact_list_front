import ContactBooksRepository from "../ContactBooksRepository";
import RestService from "../../RestService";

jest.mock("../../RestService");

const mockedRestService = RestService as jest.Mocked<typeof RestService>;

describe("ContactBooksRepository", () => {
  test("ContactBooksRepository index call is correct", async () => {
    const contact_books = [
      {
        id: 1,
        name: "aaa",
        user_id: 1,
      },
    ];

    mockedRestService.index.mockResolvedValue(contact_books);

    const response = await ContactBooksRepository.index();

    expect(response).toStrictEqual(contact_books);
    expect(RestService.index).toHaveBeenCalledWith("/contact_books", {});
  });

  test("ContactBooksRepository show call is correct", async () => {
    const contact_books = {
      id: 1,
      name: "aaa",
      user_id: 1,
    };

    mockedRestService.show.mockResolvedValue(contact_books);

    const response = await ContactBooksRepository.show(1);

    expect(response).toStrictEqual(contact_books);
    expect(RestService.show).toHaveBeenCalledWith("/contact_books", 1);
  });

  test("ContactBooksRepository create call is correct", async () => {
    const contact_books = {
      id: 1,
      name: "aaa",
      user_id: 1,
    };

    mockedRestService.create.mockResolvedValue(contact_books);

    const response = await ContactBooksRepository.create(contact_books);

    expect(response).toStrictEqual(contact_books);
    expect(RestService.create).toHaveBeenCalledWith(
      "/contact_books",
      contact_books
    );
  });

  test("ContactBooksRepository update call is correct", async () => {
    const contact_books = {
      id: 1,
      name: "aaa",
      user_id: 1,
    };

    mockedRestService.update.mockResolvedValue(contact_books);

    const response = await ContactBooksRepository.update(1, contact_books);

    expect(response).toStrictEqual(contact_books);
    expect(RestService.update).toHaveBeenCalledWith(
      "/contact_books",
      1,
      contact_books
    );
  });

  test("ContactBooksRepository delete call is correct", async () => {
    await ContactBooksRepository.delete(1);

    expect(RestService.delete).toHaveBeenCalledWith("/contact_books", 1);
  });
});
