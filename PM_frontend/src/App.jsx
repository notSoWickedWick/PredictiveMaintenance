import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import PredictorForm from "./components/PredictorForm";
import ReportsPage from "./components/ReportsPage";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PredictorForm />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
