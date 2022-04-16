import {
  ContactBook,
  ContactBookDTO,
  ContactBookRequestBody,
} from "../Interfaces/ContactBook";
import RestService from "../RestService";

class ContactBookRepository {
  async index(params: object = {}): Promise<Array<ContactBook>> {
    const contactBooks = await RestService.index<ContactBookDTO[]>(
      "/contact_books",
      params
    );

    return contactBooks.map((item): ContactBook => this.contactBook(item));
  }

  async show(id: number): Promise<ContactBook> {
    const contactBook = await RestService.show<ContactBookDTO>(
      "/contact_books",
      id
    );

    return this.contactBook(contactBook);
  }

  async create(data: ContactBookRequestBody): Promise<ContactBook> {
    const contactBook: ContactBookDTO = await RestService.create(
      "/contact_books",
      data
    );

    return this.contactBook(contactBook);
  }

  async update(id: number, data: ContactBookRequestBody): Promise<ContactBook> {
    const contactBook: ContactBookDTO = await RestService.update(
      "/contact_books",
      id,
      data
    );

    return this.contactBook(contactBook);
  }

  async delete(id: number): Promise<Response> {
    const response = await RestService.delete("/contact_books", id);

    return response;
  }

  contactBook(data: ContactBookDTO): ContactBook {
    const { id, name, user_id } = data;

    return { id, name, user_id };
  }
}

export default new ContactBookRepository();
