import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Contact } from "../Services/Interfaces/Contact";

export interface ContactCardProps {
  item: Contact;
  translations: string;
  children?: React.ReactChild;
}

export function ContactCard({
  item,
  translations,
  children,
}: ContactCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Body>
        <>
          <h2>
            {item.givenname} {item.surname}
          </h2>
          <div className="mb-4">
            <small className="text-secondary">
              {t<string>(`${translations}.email`)}
            </small>
            <h5>{item.email}</h5>

            <small className="text-secondary">
              {t<string>(`${translations}.phone`)}
            </small>
            <h5>{item.phone}</h5>
          </div>

          {children}
        </>
      </Card.Body>
    </Card>
  );
}
