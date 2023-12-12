import React from "react";
import { HashRouter } from "react-router-dom";
import { RoutesRoot } from "./routes/routes";

const MyApp = () => (
  // <div className={classes.container}>
  <div>
    <React.StrictMode>
      <HashRouter>
        {/* Load all routes here */}
        {RoutesRoot()}
      </HashRouter>
    </React.StrictMode>
  </div>
);

export default MyApp;
