import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";
import {
  ContactBookRequestBody,
  ContactBookRequestError,
} from "../../Services/Interfaces/ContactBook";
import { ContactBookForm } from "./Components/Form";

export function ContactBookNew() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<ContactBookRequestError>();

  const TRANSLATIONS: string = "contactBooksNew";

  const backToHome = () => {
    navigate("/home");
  };

  const addContactBook = async (data: ContactBookRequestBody) => {
    try {
      await ContactBooksService.create(data);

      backToHome();
    } catch (errors) {
      setErrors(errors as ContactBookRequestError);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">{t<string>(`${TRANSLATIONS}.title`)}</h2>

      <ContactBookForm
        translations={TRANSLATIONS}
        onSubmit={addContactBook}
        onBack={backToHome}
        errors={errors}
      />
    </div>
  );
}
