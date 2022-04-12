import { ContactHistory, ContactHistoryDTO } from "./ContactHistory";

export interface ContactDTO {
  id: number;
  givenname: string;
  surname: string;
  email: string;
  phone: string;
  contact_book_id: number;
  created_at: string;
  updated_at: string;
}

export interface ContactWithContactHistoriesDTO {
  id: number;
  givenname: string;
  surname: string;
  email: string;
  phone: string;
  contact_book_id: number;
  contact_histories: Array<ContactHistoryDTO>;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  givenname: string;
  surname: string;
  email: string;
  phone: string;
  contact_book_id: number;
}

export interface ContactWithContactHistories {
  id: number;
  givenname: string;
  surname: string;
  email: string;
  phone: string;
  contact_book_id: number;
  contact_histories: Array<ContactHistory>;
}

export interface ContactRequestBody {
  givenname: string;
  surname: string;
  email: string;
  phone: string;
  contact_book_id: number;
}

export interface ContactRequestError {
  errors: {
    email: Array<{ error: string; value: string }>;
  };
}
