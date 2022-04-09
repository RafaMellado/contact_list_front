import {
  ContactBook,
  ContactBookRequestBody,
  ContactBookWithContacts,
} from "./Interfaces/ContactBook";
import ContactBooksRepository from "./Repository/ContactBooksRepository";

class ContactBooksService {
  index(): Promise<ContactBook[]> {
    return ContactBooksRepository.index();
  }

  show(id: number): Promise<ContactBookWithContacts> {
    return ContactBooksRepository.show(id);
  }

  create(data: ContactBookRequestBody): Promise<ContactBook> {
    return ContactBooksRepository.create(data);
  }
}

export default new ContactBooksService();
