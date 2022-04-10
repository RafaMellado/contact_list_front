import { FormEvent, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ContactBook,
  ContactBookRequestBody,
} from "../../../Services/Interfaces/ContactBook";

interface ContactBookFormProps {
  item?: ContactBook;
  translations: string;
  submitFn: (data: ContactBookRequestBody) => void;
  backFn: () => void;
}

export function ContactBookForm({
  item,
  translations,
  submitFn,
  backFn,
}: ContactBookFormProps) {
  const { t } = useTranslation();

  const name = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitFn({ name: String(name?.current?.value) });
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>{t<string>(`${translations}.name`)}</Form.Label>
          <Form.Control
            as="input"
            type="text"
            defaultValue={item?.name}
            placeholder={t<string>(`${translations}.name`)}
            maxLength={20}
            minLength={4}
            required
            ref={name}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {t<string>(`${translations}.submit`)}
        </Button>

        <Button className="ms-2" variant="primary" onClick={backFn}>
          {t<string>(`${translations}.back`)}
        </Button>
      </Form>
    </>
  );
}
