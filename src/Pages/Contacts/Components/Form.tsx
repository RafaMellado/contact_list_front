import { FormEvent, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../../Services/ContactsService";
import { Contact } from "../../../Services/Interfaces/Contact";

interface ContactFormProps {
  data?: Contact;
  translations: string;
}

export function ContactForm({ data, translations }: ContactFormProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const givenname = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const { id, contactBookId } = useParams();

  const backToList = () => {
    const currentContactBookId = contactBookId
      ? contactBookId
      : data?.contact_book_id;

    navigate(`/contact-book/show/${currentContactBookId}`);
  };

  const formParams = () => {
    return {
      givenname: String(givenname?.current?.value),
      surname: String(surname?.current?.value),
      email: String(email?.current?.value),
      phone: String(phone?.current?.value),
      contact_book_id: Number(contactBookId) || Number(data?.contact_book_id),
    };
  };

  const addContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await ContactsService.create(formParams());

    backToList();
  };

  const editContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await ContactsService.update(Number(id), formParams());

    backToList();
  };

  const manageForm = (event: FormEvent<HTMLFormElement>) => {
    data ? editContact(event) : addContact(event);
  };

  return (
    <>
      <Form onSubmit={manageForm}>
        <Form.Group className="mb-3">
          <Form.Label>{t<string>(`${translations}.givenname`)}</Form.Label>
          <Form.Control
            as="input"
            type="text"
            defaultValue={data?.givenname}
            placeholder={t<string>(`${translations}.givenname`)}
            maxLength={24}
            minLength={2}
            required
            ref={givenname}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t<string>(`${translations}.surname`)}</Form.Label>
          <Form.Control
            as="input"
            type="text"
            defaultValue={data?.surname}
            placeholder={t<string>(`${translations}.surname`)}
            maxLength={24}
            minLength={2}
            required
            ref={surname}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t<string>(`${translations}.email`)}</Form.Label>
          <Form.Control
            as="input"
            type="email"
            defaultValue={data?.email}
            placeholder={t<string>(`${translations}.email`)}
            required
            ref={email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t<string>(`${translations}.phone`)}</Form.Label>
          <Form.Control
            as="input"
            type="tel"
            defaultValue={data?.phone}
            placeholder={t<string>(`${translations}.phone`)}
            maxLength={12}
            required
            ref={phone}
          />
        </Form.Group>

        <Button className="me-3" variant="primary" type="submit">
          {t<string>(`${translations}.submit`)}
        </Button>

        <Button variant="primary" onClick={() => backToList()}>
          {t<string>(`${translations}.backBtn`)}
        </Button>
      </Form>
    </>
  );
}
