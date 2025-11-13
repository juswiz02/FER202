import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import HomePage from "./components/pages/HomePage";
import FooterPage from "./components/pages/FooterPage";

function App() {
  return (
    <div>
      <HomePage />
      <FooterPage />
    </div>
  );
}

export default App;
