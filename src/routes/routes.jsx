import { Routes, Route } from "react-router-dom";
import MainCertificate from "../components/certificate/Main";
import Home from "../components/Home";
import NotFound from "../components/Notfound";

// import { NotFound } from "../components/notfound";

export const RoutesRoot = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/certificate" element={<MainCertificate />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
