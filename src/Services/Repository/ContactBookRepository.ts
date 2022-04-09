import {
  ContactBook,
  ContactBookDTO,
  ContactBookRequestBody,
} from "../Interfaces/ContactBook";
import RestService from "../RestService";

class ContactBookRepository {
  async index() {
    const contactBooks = await RestService.index<ContactBookDTO[]>(
      "/contact_books"
    );

    return contactBooks.map(
      (item): ContactBook => this.formattedContactBook(item)
    );
  }

  async post(data: ContactBookRequestBody) {
    const contactBook: ContactBookDTO = await RestService.post(
      "/contact_books",
      data
    );

    return this.formattedContactBook(contactBook);
  }

  formattedContactBook(contactBook: ContactBookDTO) {
    const { id, name, user_id } = contactBook;

    return { id, name, user_id };
  }
}

export default new ContactBookRepository();
