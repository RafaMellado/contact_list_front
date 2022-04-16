import ContactsService from "../ContactsService";
import ContactsRepository from "../Repositories/ContactsRepository";

jest.mock("../Repositories/ContactsRepository", () => ({
  index: jest.fn(),
  show: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const data = {
  givenname: "test",
  surname: "test surname",
  email: "test@email.es",
  phone: "123",
  contact_book_id: 1,
};

describe("ContactsService", () => {
  test("index call is correct", () => {
    ContactsService.index();

    expect(ContactsRepository.index).toHaveBeenCalledWith({});
  });

  test("show call is correct", () => {
    ContactsService.show(1);

    expect(ContactsRepository.show).toHaveBeenCalledWith(1);
  });

  test("create call is correct", () => {
    ContactsService.create(data);

    expect(ContactsRepository.create).toHaveBeenCalledWith(data);
  });

  test("update call is correct", () => {
    ContactsService.update(1, data);

    expect(ContactsRepository.update).toHaveBeenCalledWith(1, data);
  });

  test("delete call is correct", () => {
    ContactsService.delete(1);

    expect(ContactsRepository.delete).toHaveBeenCalledWith(1);
  });
});
