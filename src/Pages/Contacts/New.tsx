import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import { ContactRequestBody } from "../../Services/Interfaces/Contact";
import { ContactForm } from "./Components/Form";

export function ContactNew() {
  const TRANSLATIONS: string = "contactsNew";
  const navigate = useNavigate();

  const { contactBookId } = useParams();

  const backToList = () => {
    navigate(`/contact-book/show/${contactBookId}`);
  };

  const addContact = async (data: Partial<ContactRequestBody>) => {
    const newData = {
      ...data,
      contact_book_id: Number(contactBookId),
    };

    await ContactsService.create(newData as ContactRequestBody);

    backToList();
  };

  return (
    <ContactForm
      translations={TRANSLATIONS}
      backToListFn={backToList}
      submitFn={addContact}
    />
  );
}
