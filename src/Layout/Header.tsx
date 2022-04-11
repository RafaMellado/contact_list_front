import AuthenticationService from "../Services/AuthenticationService";
import { MenuLogged } from "./Components/MenuLogged";
import { MenuUnlogged } from "./Components/MenuUnlogged";

import "./Styles/Header.css";

export function Header() {
  const TRANSLATIONS = "layoutHeader";

  return (
    <div className="header">
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
