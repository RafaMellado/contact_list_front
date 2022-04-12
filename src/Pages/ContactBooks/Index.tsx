import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContactBook } from "../../Services/Interfaces/ContactBook";
import ContactBooksService from "../../Services/ContactBooksService";
import { ContactBookCard } from "../../Components/ContactBookCard";

export function ContactBookIndex() {
  const [contactBooks, setContactBooks] = useState<ContactBook[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const TRANSLATIONS: string = "contactBooksIndex";

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async (params = {}) => {
    const response = await ContactBooksService.index(params);

    setContactBooks(response);
  };

  const addContactBook = () => {
    navigate("/contact-book/new");
  };

  const editContactBook = (id: number) => {
    navigate(`/contact-book/${id}/edit`);
  };

  const goToContactBook = (id: number) => {
    navigate(`/contact-book/show/${id}`);
  };

  const deleteContactBook = async (id: number) => {
    await ContactBooksService.delete(id);

    reassignContactBooks(id);
  };

  const reassignContactBooks = (deletedId: number) => {
    setContactBooks(contactBooks.filter((item) => item.id !== deletedId));
  };

  return (
    <Row>
      <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-5">
        <h2>{t<string>(`${TRANSLATIONS}.title`)}</h2>

        <Button
          className="mt-md-0 mt-2"
          data-testid="contact-book-add-btn"
          onClick={addContactBook}
        >
          {t<string>(`${TRANSLATIONS}.addOther`)}
        </Button>
      </div>

      <div className="mb-4">
        <input
          placeholder={t<string>(`${TRANSLATIONS}.search`)}
          onChange={(event) =>
            getItems({ filter: { name: event.target.value } })
          }
        ></input>
      </div>

      {contactBooks.map((item: ContactBook) => {
        const { id, name } = item;

        return (
          <Col
            xs={12}
            sm={6}
            md={3}
            key={id}
            onClick={() => goToContactBook(id)}
            data-testid={`contact-book-${id}`}
            className="mb-4"
          >
            <ContactBookCard
              name={name}
              editFn={() => editContactBook(id)}
              deleteFn={() => deleteContactBook(id)}
            />
          </Col>
        );
      })}
    </Row>
  );
}
