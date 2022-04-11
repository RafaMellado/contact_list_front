import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import { ContactRequestBody } from "../../Services/Interfaces/Contact";
import { ContactForm } from "./Components/Form";

export function ContactNew() {
  const TRANSLATIONS: string = "contactsNew";

  const { contactBookId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">{t<string>(`${TRANSLATIONS}.title`)}</h2>

      <ContactForm
        translations={TRANSLATIONS}
        backToListFn={backToList}
        submitFn={addContact}
      />
    </div>
  );
}
