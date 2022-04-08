import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContactBookService from "../../Services/ContactBookService";

export function Home() {
  const [contactBooks, setContactBooks] = useState([]);
  const { t } = useTranslation();

  const TRANSLATIONS: string = "contactBook";

  useEffect(() => {
    ContactBookService.index().then((data) => {
      setContactBooks(data);
    });
  }, []);

  return (
    <div className="container">
      <h1>{t<string>(`${TRANSLATIONS}.title`)}</h1>
      {contactBooks.map((item: any) => {
        return <h3 key={item.id}>{item.name}</h3>;
      })}
    </div>
  );
}
