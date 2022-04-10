import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import { Contact, ContactRequestBody } from "../../Services/Interfaces/Contact";
import { ContactForm } from "./Components/Form";

export function ContactEdit() {
  const [contact, setContact] = useState<Contact>();

  const { id } = useParams();
  const navigate = useNavigate();

  const TRANSLATIONS: string = "contactsEdit";

  const backToList = () => {
    navigate(`/contact-book/show/${contact?.contact_book_id}`);
  };

  const editContact = async (data: Partial<ContactRequestBody>) => {
    const newData = {
      ...data,
      contact_book_id: Number(contact?.contact_book_id),
    };

    await ContactsService.update(Number(id), newData as ContactRequestBody);

    backToList();
  };

  useEffect(() => {
    ContactsService.show(Number(id)).then((response) => setContact(response));
  }, [id]);

  return (
    <ContactForm
      data={contact}
      translations={TRANSLATIONS}
      submitFn={editContact}
      backToListFn={backToList}
    />
  );
}
