import ContactBooksService from "../ContactBooksService";
import ContactBooksRepository from "../Repositories/ContactBooksRepository";

jest.mock("../Repositories/ContactBooksRepository", () => ({
  index: jest.fn(),
  show: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const data = { name: "test" };

describe("ContactBooksService", () => {
  test("index call is correct", () => {
    ContactBooksService.index();

    expect(ContactBooksRepository.index).toHaveBeenCalledWith({});
  });

  test("show call is correct", () => {
    ContactBooksService.show(1);

    expect(ContactBooksRepository.show).toHaveBeenCalledWith(1);
  });

  test("create call is correct", () => {
    ContactBooksService.create(data);

    expect(ContactBooksRepository.create).toHaveBeenCalledWith(data);
  });

  test("update call is correct", () => {
    ContactBooksService.update(1, data);

    expect(ContactBooksRepository.update).toHaveBeenCalledWith(1, data);
  });

  test("delete call is correct", () => {
    ContactBooksService.delete(1);

    expect(ContactBooksRepository.delete).toHaveBeenCalledWith(1);
  });
});
