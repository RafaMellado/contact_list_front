import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";
import {
  ContactBook,
  ContactBookRequestBody,
} from "../../Services/Interfaces/ContactBook";
import { ContactBookForm } from "./Components/Form";

export function ContactBookEdit() {
  const [contactBook, setContactBook] = useState<ContactBook>();

  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const TRANSLATIONS: string = "contactBooksEdit";

  const backToHome = () => {
    navigate("/home");
  };

  const editContactBook = async (data: ContactBookRequestBody) => {
    await ContactBooksService.update(Number(id), data).then((response) =>
      setContactBook(response)
    );

    backToHome();
  };

  useEffect(() => {
    ContactBooksService.show(Number(id)).then((response) =>
      setContactBook(response)
    );
  }, [id]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">
        {t<string>(`${TRANSLATIONS}.title`, { name: contactBook?.name })}
      </h2>

      <ContactBookForm
        translations={TRANSLATIONS}
        item={contactBook}
        submitFn={editContactBook}
        backFn={backToHome}
      />
    </div>
  );
}
