import { FormEvent, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AuthenticationService from "../../Services/AuthenticationService";

export function Login() {
  const { t } = useTranslation();

  const TRANSLATIONS: string = "login";

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await AuthenticationService.login({
      email: String(email?.current?.value),
      password: String(password?.current?.value),
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="login">
        <Card.Body>
          <Form
            onSubmit={login}
            className="d-flex flex-column align-items-center"
          >
            <Form.Group className="mb-3">
              <Form.Label>{t<string>(`${TRANSLATIONS}.email`)}</Form.Label>
              <Form.Control
                as="input"
                type="email"
                placeholder={t<string>(`${TRANSLATIONS}.email`)}
                ref={email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t<string>(`${TRANSLATIONS}.password`)}</Form.Label>
              <Form.Control
                as="input"
                type="password"
                placeholder={t<string>(`${TRANSLATIONS}.password`)}
                ref={password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {t<string>(`${TRANSLATIONS}.submit`)}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
