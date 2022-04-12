import { FormEvent, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ErrorBox } from "../../Components/ErrorBox";
import AuthenticationService from "../../Services/AuthenticationService";
import { SignUpError } from "../../Services/Interfaces/SignUp";

export function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<SignUpError>();

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

    try {
      await AuthenticationService.signUp({
        username: String(username?.current?.value),
        email: String(email?.current?.value),
        password: String(password?.current?.value),
        password_confirmation: String(passwordConfirmation?.current?.value),
      });

      backToLogin();
    } catch (errors) {
      setErrors(errors as SignUpError);
    }
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
                data-testid="sign-up-username"
                placeholder={t<string>(`${TRANSLATIONS}.username`)}
                minLength={6}
                maxLength={20}
                required
                ref={username}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t<string>(`${TRANSLATIONS}.email`)}</Form.Label>
              <Form.Control
                as="input"
                type="email"
                data-testid="sign-up-email"
                placeholder={t<string>(`${TRANSLATIONS}.email`)}
                required
                ref={email}
              />

              {errors && <ErrorBox errors={errors.errors} field="email" />}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t<string>(`${TRANSLATIONS}.password`)}</Form.Label>
              <Form.Control
                as="input"
                type="password"
                data-testid="sign-up-password"
                placeholder={t<string>(`${TRANSLATIONS}.password`)}
                minLength={6}
                required
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
                data-testid="sign-up-password-confirmation"
                placeholder={t<string>(`${TRANSLATIONS}.passwordConfirmation`)}
                required
                ref={passwordConfirmation}
              />

              {errors && (
                <ErrorBox
                  errors={errors.errors}
                  field="password_confirmation"
                />
              )}
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                className="w-100"
                variant="secondary"
                onClick={backToLogin}
              >
                {t<string>(`${TRANSLATIONS}.back`)}
              </Button>
              <Button
                data-testid="sign-up-submit"
                className="ms-2 w-100"
                variant="primary"
                type="submit"
              >
                {t<string>(`${TRANSLATIONS}.submit`)}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
