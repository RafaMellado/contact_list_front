import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContactBook } from "../../Services/Interfaces/ContactBook";
import ContactBooksService from "../../Services/ContactBooksService";

export function Home() {
  const [contactBooks, setContactBooks] = useState<ContactBook[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const TRANSLATIONS: string = "contactBooksIndex";

  useEffect(() => {
    ContactBooksService.index().then((response) => setContactBooks(response));
  }, []);

  const addContactBook = () => {
    navigate("/contact-book/new");
  };

  const goToContactBook = (id: number) => {
    navigate(`/contact-book/show/${id}`);
  };

  return (
    <div className="container">
      <Container>
        <Row>
          <h2>{t<string>(`${TRANSLATIONS}.title`)}</h2>

          {contactBooks.map((item: ContactBook) => {
            const { id, name } = item;

            return (
              <Col
                xs={12}
                sm={6}
                md={3}
                key={id}
                onClick={() => goToContactBook(id)}
              >
                <Card>
                  <Card.Body>
                    <h3>{name}</h3>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}

          <Col xs={12} sm={6} md={3}>
            <Card onClick={addContactBook}>
              <Card.Body>
                <p>{t<string>(`${TRANSLATIONS}.addOther`)}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
