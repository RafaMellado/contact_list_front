import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";
import { ContactBook } from "../../Services/Interfaces/ContactBook";
import { ContactBookContactCard } from "../../Components/ContactBookContactCard";
import ContactsService from "../../Services/ContactsService";
import { Contact } from "../../Services/Interfaces/Contact";

export function ContactBookShow() {
  const [contactBook, setContactBook] = useState<ContactBook>();
  const [contacts, setContacts] = useState<Contact[]>();

  const { id } = useParams();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const TRANSLATIONS: string = "contactBooksShow";

  useEffect(() => {
    getContactBook();
    getContacts();
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
    try {
      await ContactsService.delete(id);

      reassignContacts(id);
    } catch (error) {}
  };

  const reassignContacts = (deletedId: number) => {
    setContacts(contacts?.filter((item) => item.id !== deletedId));
  };

  const getContactBook = () => {
    ContactBooksService.show(Number(id)).then((response) =>
      setContactBook(response)
    );
  };

  const getContacts = (params = {}) => {
    const filterParams = {
      filter: {
        contact_book_id: id,
        ...params,
      },
    };

    ContactsService.index(filterParams).then((response) =>
      setContacts(response)
    );
  };

  return (
    <Row>
      <Col>
        <Button className="me-2" onClick={backBtn}>
          {t<string>(`${TRANSLATIONS}.backBtn`)}
        </Button>

        <div className="d-flex align-items-center justify-content-between my-4 flex-column flex-md-row">
          <h2>
            {t<string>(`${TRANSLATIONS}.title`, {
              name: contactBook?.name,
              count: Number(contacts?.length),
            })}
          </h2>

          <Button className="mt-3 mt-md-0" onClick={addContact}>
            {t<string>(`${TRANSLATIONS}.addContactBtn`)}
          </Button>
        </div>

        <div className="mb-4">
          <input
            placeholder={t<string>(`${TRANSLATIONS}.search`)}
            onChange={(event) => getContacts({ fullname: event.target.value })}
          />
        </div>

        <Row>
          {contacts?.map((item) => {
            return (
              <Col className="mb-4" xs={12} sm={6} md={3} key={item.id}>
                <ContactBookContactCard
                  item={item}
                  translations={TRANSLATIONS}
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
