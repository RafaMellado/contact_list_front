import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import {
  Contact,
  ContactRequestBody,
  ContactRequestError,
} from "../../Services/Interfaces/Contact";
import { ContactForm } from "./Components/Form";

export function ContactEdit() {
  const [contact, setContact] = useState<Contact>();

  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ContactRequestError>();

  const TRANSLATIONS: string = "contactsEdit";

  const backToList = () => {
    navigate(`/contact-book/show/${contact?.contact_book_id}`);
  };

  const editContact = async (data: Partial<ContactRequestBody>) => {
    const newData = {
      ...data,
      contact_book_id: Number(contact?.contact_book_id),
    };

    try {
      await ContactsService.update(Number(id), newData as ContactRequestBody);

      backToList();
    } catch (errors) {
      setErrors(errors as ContactRequestError);
    }
  };

  useEffect(() => {
    ContactsService.show(Number(id)).then((response) => setContact(response));
  }, [id]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">
        {t<string>(`${TRANSLATIONS}.title`, {
          name: `${contact?.givenname} ${contact?.surname}`,
        })}
      </h2>

      <ContactForm
        data={contact}
        translations={TRANSLATIONS}
        errors={errors}
        submitFn={editContact}
        backToListFn={backToList}
      />
    </div>
  );
}
