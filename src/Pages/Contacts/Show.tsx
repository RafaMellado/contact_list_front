import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import { ContactWithContactHistories } from "../../Services/Interfaces/Contact";
import { extractDateAndTimeFromDate } from "../../Helpers/date";

export function ContactShow() {
  const [contact, setContact] = useState<ContactWithContactHistories>();

  const { id } = useParams();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const TRANSLATIONS: string = "contactsShow";

  useEffect(() => {
    ContactsService.show(Number(id)).then((response) => setContact(response));
  }, [id]);

  const backBtn = (id: number) => {
    navigate(`/contact-book/show/${id}`);
  };

  const editContact = () => {
    navigate(`/contact/${id}/edit`);
  };

  return (
    <>
      <div className="container">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <h2>
                {contact?.givenname} {contact?.surname}
              </h2>

              <h4>{contact?.email}</h4>
              <h4>{contact?.phone}</h4>

              <Button
                className="me-2"
                onClick={() => backBtn(Number(contact?.contact_book_id))}
              >
                {t<string>(`${TRANSLATIONS}.backBtn`)}
              </Button>

              <Button className="me-2" onClick={editContact}>
                {t<string>(`${TRANSLATIONS}.editContact`)}
              </Button>
            </Col>

            <Col xs={12} md={6}>
              <h2>{t<string>(`${TRANSLATIONS}.history`)}</h2>

              {contact?.contact_histories.map((item, index) => {
                const { email, created_at } = item;
                const { date, time } = extractDateAndTimeFromDate(created_at);

                return (
                  <Card key={index}>
                    <Card.Body>
                      <h4>
                        {t<string>(`${TRANSLATIONS}.historyDay`, {
                          date,
                          time,
                        })}
                      </h4>
                      <p>
                        {item.givenname} {item.surname}
                      </p>
                      <p>{item.email}</p>
                      <p>{item.phone}</p>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
