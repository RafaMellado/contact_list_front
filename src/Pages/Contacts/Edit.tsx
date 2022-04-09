import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import { Contact } from "../../Services/Interfaces/Contact";
import { ContactForm } from "./Components/Form";

export function ContactEdit() {
  const [contact, setContact] = useState<Contact>();

  const { id } = useParams();

  const TRANSLATIONS: string = "contactsEdit";

  useEffect(() => {
    ContactsService.show(Number(id)).then((response) => setContact(response));
  }, [id]);

  return <ContactForm data={contact} translations={TRANSLATIONS} />;
}
