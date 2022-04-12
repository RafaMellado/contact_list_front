import { FormEvent, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AuthenticationService from "../../Services/AuthenticationService";
import { LoginError } from "../../Services/Interfaces/Login";

export function Login() {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<LoginError>();

  const TRANSLATIONS: string = "login";

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await AuthenticationService.login({
        email: String(email?.current?.value),
        password: String(password?.current?.value),
      });
    } catch (errors) {
      setErrors(errors as LoginError);
    }
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
                data-testid="login-email"
                placeholder={t<string>(`${TRANSLATIONS}.email`)}
                ref={email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t<string>(`${TRANSLATIONS}.password`)}</Form.Label>
              <Form.Control
                as="input"
                type="password"
                data-testid="login-password"
                placeholder={t<string>(`${TRANSLATIONS}.password`)}
                ref={password}
              />
            </Form.Group>

            {errors?.error && (
              <div className="text-danger my-2">
                <span>{t<string>("errors.login")}</span>
              </div>
            )}

            <Button data-testid="login-submit" variant="primary" type="submit">
              {t<string>(`${TRANSLATIONS}.submit`)}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
