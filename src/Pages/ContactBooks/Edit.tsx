import { useEffect, useState } from "react";
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
    <ContactBookForm
      translations={TRANSLATIONS}
      item={contactBook}
      submitFn={editContactBook}
      backFn={backToHome}
    />
  );
}
