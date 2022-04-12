import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface MenuUnloggedProps {
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
      <Button
        data-testid="menu-unlogged-btn"
        className="me-3"
        variant="primary"
        onClick={goToSignUp}
      >
        {t<string>(`${translations}.signUpBtn`)}
      </Button>
    </>
  );
}
