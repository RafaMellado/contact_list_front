import { ContactBook, ContactBookRequestBody } from "./Interfaces/ContactBook";
import ContactBooksRepository from "./Repository/ContactBooksRepository";

class ContactBooksService {
  index(params: object): Promise<ContactBook[]> {
    return ContactBooksRepository.index(params);
  }

  show(id: number): Promise<ContactBook> {
    return ContactBooksRepository.show(id);
  }

  create(data: ContactBookRequestBody): Promise<ContactBook> {
    return ContactBooksRepository.create(data);
  }

  update(id: number, data: ContactBookRequestBody): Promise<ContactBook> {
    return ContactBooksRepository.update(id, data);
  }

  delete(id: number): Promise<Response> {
    return ContactBooksRepository.delete(id);
  }
}

export default new ContactBooksService();
