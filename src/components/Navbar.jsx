import React from "react";
import { Link } from 'react-router-dom';
require('bootstrap');

function Navbar() {

    return (
        <nav className="navbar navbar-dark navbar-expand-lg" style={{background: "#f2b8a7"}}>
        <div className="container">
                <Link to="/" className="navbar-brand">HappyApp</Link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/logs" className="nav-link">Create Log</Link>
                        </li>
                    </ul>
                </div>
        </div>
        </nav>
    )
}

export default Navbar;