import { Routes as Switch, Route } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import { Home } from "../Pages/Home/Home";
import { ContactBookNew } from "../Pages/ContactBooks/New";
import { ContactNew } from "../Pages/Contacts/New";
import { ContactBookShow } from "../Pages/ContactBooks/Show";
import { ContactShow } from "../Pages/Contacts/Show";
import { ContactEdit } from "../Pages/Contacts/Edit";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<PublicRoute RouteComponent={Login} />} />
      <Route path="/home" element={<PrivateRoute RouteComponent={Home} />} />

      <Route
        path="/contact-book/new"
        element={<PrivateRoute RouteComponent={ContactBookNew} />}
      />
      <Route
        path="/contact-book/show/:id"
        element={<PrivateRoute RouteComponent={ContactBookShow} />}
      />

      <Route
        path="/contact-book/:contactBookId/contact/new"
        element={<PrivateRoute RouteComponent={ContactNew} />}
      />

      <Route
        path="/contact/:id"
        element={<PrivateRoute RouteComponent={ContactShow} />}
      />

      <Route
        path="/contact/:id/edit"
        element={<PrivateRoute RouteComponent={ContactEdit} />}
      />
    </Switch>
  );
}
