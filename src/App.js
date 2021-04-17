import React from "react";
import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import DayList from "./components/DayList";
import EditDay from "./components/EditDay";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path='/' exact component={LandingPage} />
      <Route path='/logs' component={DayList} />
      <Route path='/edit/:id' component={EditDay} />
    </Router>
  );
}

export default App;
