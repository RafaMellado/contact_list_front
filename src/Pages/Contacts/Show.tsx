import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../Services/ContactsService";
import { ContactWithContactHistories } from "../../Services/Interfaces/Contact";
import { ContactCard } from "../../Components/ContactCard";
import { ContactHistoryCard } from "../../Components/ContactHistoryCard";

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
    <Row>
      <Col xs={12} md={6}>
        {contact && (
          <ContactCard item={contact}>
            <>
              <Button
                className="me-2"
                onClick={() => backBtn(Number(contact.contact_book_id))}
              >
                {t<string>(`${TRANSLATIONS}.backBtn`)}
              </Button>

              <Button className="me-2" onClick={editContact}>
                {t<string>(`${TRANSLATIONS}.editContact`)}
              </Button>
            </>
          </ContactCard>
        )}
      </Col>

      <Col xs={12} md={6}>
        {!!contact?.contact_histories.length && (
          <>
            <h2>{t<string>(`${TRANSLATIONS}.history`)}</h2>

            {contact.contact_histories.map((item, index) => {
              return (
                <ContactHistoryCard
                  item={item}
                  key={index}
                  translations={TRANSLATIONS}
                />
              );
            })}
          </>
        )}
      </Col>
    </Row>
  );
}
