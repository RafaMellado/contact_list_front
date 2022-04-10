import {
  ContactBook,
  ContactBookDTO,
  ContactBookRequestBody,
  ContactBookWithContacts,
  ContactBookWithContactsDTO,
} from "../Interfaces/ContactBook";
import RestService from "../RestService";

class ContactBookRepository {
  async index(): Promise<Array<ContactBook>> {
    const contactBooks = await RestService.index<ContactBookDTO[]>(
      "/contact_books"
    );

    return contactBooks.map((item): ContactBook => this.contactBook(item));
  }

  async show(id: number): Promise<ContactBookWithContacts> {
    const contactBook = await RestService.show<ContactBookWithContactsDTO>(
      "/contact_books",
      id
    );

    return this.contactBookWithContacts(contactBook);
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

  contactBookWithContacts(
    data: ContactBookWithContactsDTO
  ): ContactBookWithContacts {
    const { id, name, user_id, contacts } = data;

    return { id, name, user_id, contacts };
  }
}

export default new ContactBookRepository();
