import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  code: number;
  Icon: IconType;
}

export function ErrorPage({ code, Icon }: ErrorPageProps) {
  const TRANSLATIONS = "errors";
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="d-flex align-items-center flex-column">
        <Icon className="h1" />
        <h2>{t<string>(`${TRANSLATIONS}.${code}.title`)}</h2>
      </div>
      <h5>{t<string>(`${TRANSLATIONS}.${code}.description`)}</h5>

      <div className="mt-2">
        <Button
          data-testid="error-page-btn"
          className="w-100 ms-2"
          variant="primary"
          onClick={goHome}
        >
          {t<string>(`${TRANSLATIONS}.back`)}
        </Button>
      </div>
    </div>
  );
}
