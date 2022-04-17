import { FormEvent, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ErrorBox } from "../../../Components/ErrorBox";
import {
  ContactBook,
  ContactBookRequestBody,
  ContactBookRequestError,
} from "../../../Services/Interfaces/ContactBook";

export interface ContactBookFormProps {
  item?: ContactBook;
  translations: string;
  errors?: ContactBookRequestError;
  onSubmit: (data: ContactBookRequestBody) => void;
  onBack: () => void;
}

export function ContactBookForm({
  item,
  translations,
  errors,
  onSubmit,
  onBack,
}: ContactBookFormProps) {
  const { t } = useTranslation();

  const name = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({ name: String(name?.current?.value) });
  };

  return (
    <Card className="form">
      <Card.Body>
        <Form data-testid="contact-book-form" onSubmit={submit}>
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

            {errors && <ErrorBox errors={errors.errors} field="name" />}
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              data-testid="contact-book-back-btn"
              className="w-100"
              variant="secondary"
              onClick={onBack}
            >
              {t<string>(`${translations}.back`)}
            </Button>
            <Button className="w-100 ms-2" variant="primary" type="submit">
              {t<string>(`${translations}.submit`)}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
