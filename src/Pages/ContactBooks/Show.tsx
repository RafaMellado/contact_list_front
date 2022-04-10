import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";
import { ContactBookWithContacts } from "../../Services/Interfaces/ContactBook";
import { ContactBookContactCard } from "../../Components/ContactBookContactCard";
import ContactsService from "../../Services/ContactsService";

export function ContactBookShow() {
  const [contactBook, setContactBook] = useState<ContactBookWithContacts>();

  const { id } = useParams();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const TRANSLATIONS: string = "contactBooksShow";

  useEffect(() => {
    ContactBooksService.show(Number(id)).then((response) =>
      setContactBook(response)
    );
  }, [id]);

  const addContact = () => {
    navigate(`/contact-book/${id}/contact/new`);
  };

  const backBtn = () => {
    navigate("/home");
  };

  const goToContactShow = (contactId: number) => {
    navigate(`/contact/${contactId}`);
  };

  const goToEditContact = (contactId: number) => {
    navigate(`/contact/${contactId}/edit`);
  };

  const deleteContact = async (id: number) => {
    await ContactsService.delete(id);

    reassignContacts(id);
  };

  const reassignContacts = (deletedId: number) => {
    const updatedContactBook = {
      ...contactBook,
      contacts: contactBook?.contacts.filter((item) => item.id !== deletedId),
    };

    setContactBook(updatedContactBook as ContactBookWithContacts);
  };

  return (
    <Row>
      <Col>
        <h2>{contactBook?.name}</h2>

        <Button className="me-2" onClick={backBtn}>
          {t<string>(`${TRANSLATIONS}.backBtn`)}
        </Button>

        <Button onClick={addContact}>
          {t<string>(`${TRANSLATIONS}.addContactBtn`)}
        </Button>

        <h3>{t<string>(`${TRANSLATIONS}.contacts`)}</h3>

        <Row>
          {contactBook?.contacts.map((item) => {
            return (
              <Col xs={12} sm={6} md={3} key={item.id}>
                <ContactBookContactCard
                  item={item}
                  cardFn={() => goToContactShow(item.id)}
                  editFn={() => goToEditContact(item.id)}
                  deleteFn={() => deleteContact(item.id)}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
