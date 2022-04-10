import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface MenuUnloggedProps {
  translations: string;
}

export function MenuUnlogged({ translations }: MenuUnloggedProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <Button className="me-3" variant="primary" onClick={goToSignUp}>
        {t<string>(`${translations}.signUpBtn`)}
      </Button>
    </>
  );
}
