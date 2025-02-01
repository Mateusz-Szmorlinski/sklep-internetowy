import React from "react";
import "./NotFound.css";
import { NavLink } from "react-router-dom";

function NotFound() {
    return(
        <section id="not-found">
            <h1>Page not found</h1>
            <NavLink to={"/"}>Go to home page</NavLink>
        </section>
    );
}

export default NotFound;