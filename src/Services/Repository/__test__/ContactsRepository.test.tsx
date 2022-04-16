import ContactsRepository from "../ContactsRepository";
import RestService from "../../RestService";

jest.mock("../../RestService");

const mockedRestService = RestService as jest.Mocked<typeof RestService>;

describe("ContactsRepository", () => {
  test("ContactsRepository index call is correct", async () => {
    const contacts = [
      {
        contact_book_id: 1,
        email: "ccc",
        givenname: "aaa",
        id: 1,
        phone: "123456789",
        surname: "bbb",
      },
    ];

    mockedRestService.index.mockResolvedValue(contacts);

    const response = await ContactsRepository.index();

    expect(response).toStrictEqual(contacts);
    expect(RestService.index).toHaveBeenCalledWith("/contacts", {});
  });

  test("ContactsRepository show call is correct", async () => {
    const contact = {
      contact_book_id: 1,
      email: "ccc",
      givenname: "aaa",
      id: 1,
      phone: "123456789",
      surname: "bbb",
      contact_histories: [],
    };

    mockedRestService.show.mockResolvedValue(contact);

    const response = await ContactsRepository.show(1);

    expect(response).toStrictEqual(contact);
    expect(RestService.show).toHaveBeenCalledWith("/contacts", 1);
  });

  test("ContactsRepository create call is correct", async () => {
    const contact = {
      contact_book_id: 1,
      email: "ccc",
      givenname: "aaa",
      id: 1,
      phone: "123456789",
      surname: "bbb",
    };

    mockedRestService.create.mockResolvedValue(contact);

    const response = await ContactsRepository.create(contact);

    expect(response).toStrictEqual(contact);
    expect(RestService.create).toHaveBeenCalledWith("/contacts", contact);
  });

  test("ContactsRepository update call is correct", async () => {
    const contact = {
      contact_book_id: 1,
      email: "ccc",
      givenname: "aaa",
      id: 1,
      phone: "123456789",
      surname: "bbb",
    };

    mockedRestService.update.mockResolvedValue(contact);

    const response = await ContactsRepository.update(1, contact);

    expect(response).toStrictEqual(contact);
    expect(RestService.update).toHaveBeenCalledWith("/contacts", 1, contact);
  });

  test("ContactsRepository delete call is correct", async () => {
    await ContactsRepository.delete(1);

    expect(RestService.delete).toHaveBeenCalledWith("/contacts", 1);
  });
});
