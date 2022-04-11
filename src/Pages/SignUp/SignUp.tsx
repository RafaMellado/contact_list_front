import { FormEvent, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../Services/AuthenticationService";

export function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const TRANSLATIONS = "signUp";

  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);

  const backToLogin = () => {
    navigate("/");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    await AuthenticationService.signUp({
      username: String(username?.current?.value),
      email: String(email?.current?.value),
      password: String(password?.current?.value),
      password_confirmation: String(passwordConfirmation?.current?.value),
    });

    backToLogin();
  };

  return (
    <div className="d-flex justify-content-center">
      <Card>
        <Card.Body>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>{t<string>(`${TRANSLATIONS}.username`)}</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder={t<string>(`${TRANSLATIONS}.username`)}
                ref={username}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t<string>(`${TRANSLATIONS}.email`)}</Form.Label>
              <Form.Control
                as="input"
                type="text"
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

            <Form.Group className="mb-3">
              <Form.Label>
                {t<string>(`${TRANSLATIONS}.passwordConfirmation`)}
              </Form.Label>
              <Form.Control
                as="input"
                type="password"
                placeholder={t<string>(`${TRANSLATIONS}.passwordConfirmation`)}
                ref={passwordConfirmation}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                className="w-100"
                variant="secondary"
                onClick={backToLogin}
              >
                {t<string>(`${TRANSLATIONS}.back`)}
              </Button>
              <Button className="ms-2 w-100" variant="primary" type="submit">
                {t<string>(`${TRANSLATIONS}.submit`)}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}