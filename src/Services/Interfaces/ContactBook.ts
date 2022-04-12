import { Contact } from "./Contact";

export interface ContactBookDTO {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ContactBookWithContactsDTO {
  id: number;
  name: string;
  user_id: number;
  contacts: Array<Contact>;
  created_at: string;
  updated_at: string;
}

export interface ContactBook {
  id: number;
  name: string;
  user_id: number;
}

export interface ContactBookWithContacts {
  id: number;
  name: string;
  user_id: number;
  contacts: Array<Contact>;
}

export interface ContactBookRequestBody {
  name: string;
}

export interface ContactBookRequestError {
  errors: {
    name: Array<{ error: string; value: string }>;
  };
}
