import { Routes as Switch, Route } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import { SignUp } from "../Pages/SignUp/SignUp";
import { ContactBookIndex } from "../Pages/ContactBooks/Index";
import { ContactBookNew } from "../Pages/ContactBooks/New";
import { ContactBookShow } from "../Pages/ContactBooks/Show";
import { ContactBookEdit } from "../Pages/ContactBooks/Edit";
import { ContactNew } from "../Pages/Contacts/New";
import { ContactShow } from "../Pages/Contacts/Show";
import { ContactEdit } from "../Pages/Contacts/Edit";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Error401 } from "../Pages/Errors/Error401";
import { Error403 } from "../Pages/Errors/Error403";
import { Error404 } from "../Pages/Errors/Error404";
import { Error500 } from "../Pages/Errors/Error500";

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<PublicRoute RouteComponent={Login} />} />
      <Route
        path="/sign-up"
        element={<PublicRoute RouteComponent={SignUp} />}
      />

      <Route
        path="/home"
        element={<PrivateRoute RouteComponent={ContactBookIndex} />}
      />

      <Route
        path="/contact-book/new"
        element={<PrivateRoute RouteComponent={ContactBookNew} />}
      />
      <Route
        path="/contact-book/show/:id"
        element={<PrivateRoute RouteComponent={ContactBookShow} />}
      />
      <Route
        path="/contact-book/:id/edit"
        element={<PrivateRoute RouteComponent={ContactBookEdit} />}
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

      <Route path="/error-401" element={<Error401 />} />
      <Route path="/error-403" element={<Error403 />} />
      <Route path="/error-404" element={<Error404 />} />
      <Route path="/error-500" element={<Error500 />} />
    </Switch>
  );
}
