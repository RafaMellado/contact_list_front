import { useNavigate } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";
import { ContactBookRequestBody } from "../../Services/Interfaces/ContactBook";
import { ContactBookForm } from "./Components/Form";

export function ContactBookNew() {
  const navigate = useNavigate();
  const TRANSLATIONS: string = "contactBooksNew";

  const backToHome = () => {
    navigate("/home");
  };

  const addContactBook = async (data: ContactBookRequestBody) => {
    await ContactBooksService.create(data);

    backToHome();
  };

  return (
    <ContactBookForm
      translations={TRANSLATIONS}
      submitFn={addContactBook}
      backFn={backToHome}
    />
  );
}
