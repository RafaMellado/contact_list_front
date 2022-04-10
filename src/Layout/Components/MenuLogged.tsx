import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AuthenticationService from "../../Services/AuthenticationService";

interface MenuLoggedProps {
  translations: string;
}

export function MenuLogged({ translations }: MenuLoggedProps) {
  const { t } = useTranslation();

  return (
    <>
      <Button
        className="me-3"
        variant="primary"
        onClick={AuthenticationService.logout}
      >
        {t<string>(`${translations}.logout`)}
      </Button>
    </>
  );
}
