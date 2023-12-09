import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";
import ModalCard from "./components/Modal";
import { dhisDates } from "./utils/dhisDates";
import { PeriodCalendar } from "./components/Calendar";
import Loader from "./components/commons/Loader";
import Home from "./components/Home";
import { RoutesRoot } from "./routes/routes";

const query = {
  me: {
    resource: "me",
  },
};

const MyApp = () => (
  // <div className={classes.container}>
  <div>
    <React.StrictMode>
      <BrowserRouter>
        {/* Load all routes here */}
        {RoutesRoot()}
      </BrowserRouter>
    </React.StrictMode>
  </div>
);

export default MyApp;
