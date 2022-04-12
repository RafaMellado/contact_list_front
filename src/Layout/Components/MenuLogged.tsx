import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AuthenticationService from "../../Services/AuthenticationService";

export interface MenuLoggedProps {
  translations: string;
}

export function MenuLogged({ translations }: MenuLoggedProps) {
  const { t } = useTranslation();

  return (
    <>
      <Button
        className="me-3"
        variant="primary"
        data-testid="menu-logged-logout-btn"
        onClick={AuthenticationService.logout}
      >
        {t<string>(`${translations}.logout`)}
      </Button>
    </>
  );
}
