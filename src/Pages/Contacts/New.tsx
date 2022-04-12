import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import {
  ContactRequestBody,
  ContactRequestError,
} from "../../Services/Interfaces/Contact";
import { ContactForm } from "./Components/Form";

export function ContactNew() {
  const { contactBookId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ContactRequestError>();

  const TRANSLATIONS: string = "contactsNew";

  const backToList = () => {
    navigate(`/contact-book/show/${contactBookId}`);
  };

  const addContact = async (data: Partial<ContactRequestBody>) => {
    const newData = {
      ...data,
      contact_book_id: Number(contactBookId),
    };

    try {
      await ContactsService.create(newData as ContactRequestBody);

      backToList();
    } catch (errors) {
      setErrors(errors as ContactRequestError);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">{t<string>(`${TRANSLATIONS}.title`)}</h2>

      <ContactForm
        translations={TRANSLATIONS}
        errors={errors}
        backToListFn={backToList}
        submitFn={addContact}
      />
    </div>
  );
}
