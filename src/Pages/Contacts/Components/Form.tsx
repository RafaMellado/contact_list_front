import { FormEvent, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ErrorBox } from "../../../Components/ErrorBox";
import {
  Contact,
  ContactRequestBody,
  ContactRequestError,
} from "../../../Services/Interfaces/Contact";

interface ContactFormProps {
  data?: Contact;
  translations: string;
  errors?: ContactRequestError;
  submitFn: (data: Partial<ContactRequestBody>) => void;
  backToListFn: () => void;
}

export function ContactForm({
  data,
  translations,
  errors,
  submitFn,
  backToListFn,
}: ContactFormProps) {
  const { t } = useTranslation();

  const givenname = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const formParams = () => {
    return {
      givenname: String(givenname?.current?.value),
      surname: String(surname?.current?.value),
      email: String(email?.current?.value),
      phone: String(phone?.current?.value),
    };
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitFn(formParams());
  };

  return (
    <Card className="form">
      <Card.Body>
        <Form onSubmit={submit}>
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

            {errors && <ErrorBox errors={errors.errors} field="email" />}
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

          <div className="d-flex justify-content-between">
            <Button
              className="w-100"
              variant="secondary"
              onClick={() => backToListFn()}
            >
              {t<string>(`${translations}.backBtn`)}
            </Button>

            <Button className="w-100 ms-3" variant="primary" type="submit">
              {t<string>(`${translations}.submit`)}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
