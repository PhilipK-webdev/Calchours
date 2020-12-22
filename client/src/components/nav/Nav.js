import React from 'react'
import { Link } from "react-router-dom";
import AuthOptions from '../auth/AuthOptions';
const Nav = () => {
    return (
        <nav className="navbar navbar-light m-0" style={{ backgroundColor: "#e3f2fd" }}>
            <div className="container-fluid" style={{ height: "10vh" }}>
                <Link to="/" className="navbar-brand">
                    Calchours - My monthly hours
            </Link>
                <AuthOptions></AuthOptions>
            </div>
        </nav>

    )
}

export default Nav

