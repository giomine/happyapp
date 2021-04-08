import React from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import DayList from "./components/DayList";
import EditDay from "./components/EditDay";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path='/' exact component={DayList} />
      <Route path='/edit/:id' component={EditDay} />
    </Router>
  );
}

export default App;
