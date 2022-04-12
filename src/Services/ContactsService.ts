import {
  Contact,
  ContactRequestBody,
  ContactWithContactHistories,
} from "./Interfaces/Contact";
import ContactsRepository from "./Repository/ContactsRepository";

class ContactsService {
  index(params: object): Promise<Contact[]> {
    return ContactsRepository.index(params);
  }

  show(id: number): Promise<ContactWithContactHistories> {
    return ContactsRepository.show(id);
  }

  create(data: ContactRequestBody): Promise<Contact> {
    return ContactsRepository.create(data);
  }

  update(id: number, data: ContactRequestBody): Promise<Contact> {
    return ContactsRepository.update(id, data);
  }

  delete(id: number): Promise<Response> {
    return ContactsRepository.delete(id);
  }
}

export default new ContactsService();
