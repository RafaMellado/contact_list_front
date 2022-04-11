import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";
import { ContactBookRequestBody } from "../../Services/Interfaces/ContactBook";
import { ContactBookForm } from "./Components/Form";

export function ContactBookNew() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const TRANSLATIONS: string = "contactBooksNew";

  const backToHome = () => {
    navigate("/home");
  };

  const addContactBook = async (data: ContactBookRequestBody) => {
    await ContactBooksService.create(data);

    backToHome();
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">{t<string>(`${TRANSLATIONS}.title`)}</h2>

      <ContactBookForm
        translations={TRANSLATIONS}
        submitFn={addContactBook}
        backFn={backToHome}
      />
    </div>
  );
}
