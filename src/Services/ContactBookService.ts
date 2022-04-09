import { ContactBook, ContactBookRequestBody } from "./Interfaces/ContactBook";
import ContactBookRepository from "./Repository/ContactBookRepository";

class ContactBookService {
  index(): Promise<ContactBook[]> {
    return ContactBookRepository.index();
  }

  new(data: ContactBookRequestBody): Promise<ContactBook> {
    return ContactBookRepository.post(data);
  }
}

export default new ContactBookService();
