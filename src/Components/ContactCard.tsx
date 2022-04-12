import { Card } from "react-bootstrap";
import { Contact } from "../Services/Interfaces/Contact";

export interface ContactCardProps {
  item: Contact;
  children?: React.ReactChild;
}

export function ContactCard({ item, children }: ContactCardProps) {
  return (
    <Card>
      <Card.Body>
        <>
          <h2>
            {item.givenname} {item.surname}
          </h2>

          <h5>{item.email}</h5>
          <h5>{item.phone}</h5>

          {children}
        </>
      </Card.Body>
    </Card>
  );
}
