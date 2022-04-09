import { FormEvent, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ContactBooksService from "../../Services/ContactBooksService";

export function ContactBookNew() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const name = useRef<HTMLInputElement>(null);

  const TRANSLATIONS: string = "contactBooksNew";

  const addContactBook = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    ContactBooksService.create({ name: String(name?.current?.value) });

    navigate("/home");
  };

  return (
    <>
      <Form onSubmit={addContactBook}>
        <Form.Group className="mb-3">
          <Form.Label>{t<string>(`${TRANSLATIONS}.name`)}</Form.Label>
          <Form.Control
            as="input"
            type="text"
            placeholder={t<string>(`${TRANSLATIONS}.name`)}
            maxLength={20}
            minLength={4}
            required
            ref={name}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {t<string>(`${TRANSLATIONS}.submit`)}
        </Button>
      </Form>
    </>
  );
}
