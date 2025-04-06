import React from "react"
import NavBar from "./components/navBar"
import PredictorForm from "./components/PredictorForm"
import ReportSection from "./components/ReportSection"
import Footer from "./components/Footer"
import "./index.css"

const App = () => {
  return (
    <div>
      <NavBar/>
      <PredictorForm />
      <ReportSection />
      <Footer/>
    </div>
  );
};

export default App;