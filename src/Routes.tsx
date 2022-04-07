import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Login />}></Route>
    </Switch>
  );
}
