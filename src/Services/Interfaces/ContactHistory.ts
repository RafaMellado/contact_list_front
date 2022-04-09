export interface ContactHistoryDTO {
  id: number;
  givenname: string;
  surname: string;
  email: string;
  phone: string;
  contact_id: number;
  created_at: string;
  updated_at: string;
}

export interface ContactHistory {
  givenname: string;
  surname: string;
  email: string;
  phone: string;
  created_at: string;
}
