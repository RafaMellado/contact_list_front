import { Contact } from "../Services/Interfaces/Contact";

interface ContactCardProps {
  item: Contact;
  children?: React.ReactChild;
}

export function ContactCard({ item, children }: ContactCardProps) {
  return (
    <>
      <h2>
        {item.givenname} {item.surname}
      </h2>

      <h4>{item.email}</h4>
      <h4>{item.phone}</h4>

      {children}
    </>
  );
}
