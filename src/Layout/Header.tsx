import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AuthenticationService from "../Services/AuthenticationService";

export function Header() {
  const { t } = useTranslation();

  const TRANSLATIONS = "layoutHeader";

  const logout = () => {
    AuthenticationService.logout();
  };

  return (
    <div className="position-fixed fixed-top p-3">
      <div className="d-flex justify-content-end">
        <Button className="me-3" variant="primary" onClick={logout}>
          {t<string>(`${TRANSLATIONS}.logout`)}
        </Button>
      </div>
    </div>
  );
}
