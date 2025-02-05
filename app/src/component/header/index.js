
// Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Header() {
    return (
        <div className="navbar">
            <Link to="/" className="title">Student Details</Link>
            <Link to="/outpass" className="title">OutPass</Link>
            <Link to="/washingmachine" className="title">Washing Machine</Link>
            <Link to="/feedback" className="title">Feedback</Link>
        </div>
    );
}

export default Header;
