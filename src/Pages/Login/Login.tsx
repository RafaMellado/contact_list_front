import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginService from "../../Services/Login";

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const TRANSLATIONS: string = "login";

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const login = async (event: any) => {
    event.preventDefault();

    const logged = await LoginService.login({
      email: String(email?.current?.value),
      password: String(password?.current?.value),
    });

    if (logged) {
      navigate("/home");
    }
  };

  return (
    <>
      <Form onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Label>{t<string>(`${TRANSLATIONS}.email`)}</Form.Label>
          <Form.Control
            as="input"
            type="email"
            placeholder={t<string>(`${TRANSLATIONS}.email`)}
            ref={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
    </>
  );
}
