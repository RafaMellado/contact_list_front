import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContactBook } from "../../Services/Interfaces/ContactBook";
import ContactBookService from "../../Services/ContactBookService";

export function Home() {
  const [contactBooks, setContactBooks] = useState<ContactBook[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const TRANSLATIONS: string = "contactBookIndex";

  useEffect(() => {
    ContactBookService.index().then((response) => setContactBooks(response));
  }, []);

  const addContactBook = () => {
    navigate("/contact_book/new");
  };

  return (
    <div className="container">
      <Container>
        <Row>
          <h2>{t<string>(`${TRANSLATIONS}.title`)}</h2>

          {contactBooks.map((item: ContactBook) => {
            return (
              <Col xs={12} sm={6} md={3} key={item.id}>
                <Card>
                  <Card.Body>
                    <h3>{item.name}</h3>
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
