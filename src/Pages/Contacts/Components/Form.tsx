import { FormEvent, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ErrorBox } from "../../../Components/ErrorBox";
import {
  Contact,
  ContactRequestBody,
  ContactRequestError,
} from "../../../Services/Interfaces/Contact";

export interface ContactFormProps {
  item?: Contact;
  translations: string;
  errors?: ContactRequestError;
  submitFn: (item: Partial<ContactRequestBody>) => void;
  backFn: () => void;
}

export function ContactForm({
  item,
  translations,
  errors,
  submitFn,
  backFn,
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
        <Form data-testid="contact-form" onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>{t<string>(`${translations}.givenname`)}</Form.Label>
            <Form.Control
              as="input"
              type="text"
              defaultValue={item?.givenname}
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
              defaultValue={item?.surname}
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
              defaultValue={item?.email}
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
              defaultValue={item?.phone}
              placeholder={t<string>(`${translations}.phone`)}
              maxLength={12}
              required
              ref={phone}
            />

            {errors && <ErrorBox errors={errors.errors} field="phone" />}
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              data-testid="contact-form-back-btn"
              className="w-100"
              variant="secondary"
              onClick={() => backFn()}
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
