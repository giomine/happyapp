import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className="navbar navbar-dark bg-info navbar-expand-lg">
        <div className="container">
                <Link to="/" className="navbar-brand">HappyApp</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Daily Log</Link>
                        </li>
                    </ul>
                </div>
        </div>
        </nav>
    )
}

export default Navbar;