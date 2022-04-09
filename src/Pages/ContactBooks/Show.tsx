import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";
import { ContactBookWithContacts } from "../../Services/Interfaces/ContactBook";

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

  const goToEditContact = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    contactId: number
  ) => {
    event.stopPropagation();

    navigate(`/contact/${contactId}/edit`);
  };

  return (
    <>
      <div className="container">
        <Container>
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
                  const { id, givenname, surname, email, phone } = item;

                  return (
                    <Col xs={12} sm={6} md={3} key={id}>
                      <Card onClick={() => goToContactShow(id)}>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">
                              {givenname} {surname}
                            </h3>

                            <BsPencilSquare
                              role="button"
                              onClick={(event) => goToEditContact(event, id)}
                            />
                          </div>

                          <p>{email}</p>
                          <p>{phone}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
