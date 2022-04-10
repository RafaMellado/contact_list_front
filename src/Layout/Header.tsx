import AuthenticationService from "../Services/AuthenticationService";
import { MenuLogged } from "./Components/MenuLogged";
import { MenuUnlogged } from "./Components/MenuUnlogged";

export function Header() {
  const TRANSLATIONS = "layoutHeader";

  return (
    <div className="position-fixed fixed-top p-3">
      <div className="d-flex justify-content-end">
        {AuthenticationService.isLogged() ? (
          <MenuLogged translations={TRANSLATIONS} />
        ) : (
          <MenuUnlogged translations={TRANSLATIONS} />
        )}
      </div>
    </div>
  );
}
