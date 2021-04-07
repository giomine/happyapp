import React from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import DayList from "./components/DayList";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path='/' exact component={DayList} />
    </Router>
  );
}

export default App;
