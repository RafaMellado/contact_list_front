import {
  Contact,
  ContactDTO,
  ContactRequestBody,
  ContactWithContactHistoriesDTO,
  ContactWithContactHistories,
} from "../Interfaces/Contact";
import {
  ContactHistory,
  ContactHistoryDTO,
} from "../Interfaces/ContactHistory";
import RestService from "../RestService";

class ContactsRepository {
  async index(params: object): Promise<Array<Contact>> {
    const contacts = await RestService.index<ContactDTO[]>("/contacts", params);

    return contacts.map((item): Contact => this.contact(item));
  }

  async show(id: number): Promise<ContactWithContactHistories> {
    const contactBook = await RestService.show<ContactWithContactHistoriesDTO>(
      "/contacts",
      id
    );

    return this.contactWithContactHistories(contactBook);
  }

  async create(data: ContactRequestBody): Promise<Contact> {
    const contact: ContactDTO = await RestService.create("/contacts", data);

    return this.contact(contact);
  }

  async update(id: number, data: ContactRequestBody): Promise<Contact> {
    const contact: ContactDTO = await RestService.update("/contacts", id, data);

    return this.contact(contact);
  }

  async delete(id: number): Promise<Response> {
    const response = await RestService.delete("/contacts", id);

    return response;
  }

  contact(data: ContactDTO): Contact {
    const { id, givenname, surname, email, phone, contact_book_id } = data;

    return { id, givenname, surname, email, phone, contact_book_id };
  }

  contactWithContactHistories(
    data: ContactWithContactHistoriesDTO
  ): ContactWithContactHistories {
    const {
      id,
      givenname,
      surname,
      email,
      phone,
      contact_book_id,
      contact_histories,
    } = data;

    return {
      id,
      givenname,
      surname,
      email,
      phone,
      contact_book_id,
      contact_histories: this.formatContactHistories(contact_histories),
    };
  }

  formatContactHistories(
    contactHistories: Array<ContactHistoryDTO>
  ): Array<ContactHistory> {
    return this.sortedContactHistories(contactHistories).map((item) => {
      const { givenname, surname, email, phone, created_at } = item;

      return {
        givenname,
        surname,
        email,
        phone,
        created_at,
      };
    });
  }

  sortedContactHistories(
    contactHistories: Array<ContactHistoryDTO>
  ): Array<ContactHistory> {
    return contactHistories.sort((a, b) => {
      return (
        new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      );
    });
  }
}

export default new ContactsRepository();
