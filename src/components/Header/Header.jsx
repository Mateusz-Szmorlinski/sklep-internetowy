import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../Data/Users/Users";


function Header() {
    const { currentUser } = useUser();
    const [mobile, setMobile] = useState(false);
    const [visibility, setVisibility] = useState(false);

    function toggleVisibility() {
        setVisibility(!visibility);
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= window.innerHeight) {
                setMobile(true);
            } else if (window.innerWidth > window.innerHeight) {
                setMobile(false);
            }
        };

        if (window.innerWidth <= 800) {
            setMobile(true);
        } else if (window.innerWidth > 800) {
            setMobile(false);
        }

        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <h1><NavLink className="nav-link" onClick={toggleVisibility} to={"/"} style={{textTransform: "uppercase"}}>Sklep</NavLink></h1>
            {mobile && 
                <div id="burger-nav" style={visibility ? {top: "0"} : {top: "-120svh"}}>
                    <ul>
                        <li><NavLink className="nav-link" onClick={toggleVisibility} to={"/cart"}>Cart</NavLink></li>
                        <li><NavLink className="nav-link" onClick={toggleVisibility} to={"/account"}>Account</NavLink></li>
                    </ul>
                    <button onClick={toggleVisibility}><img src={process.env.PUBLIC_URL + "./icons/X.svg"}/></button>
                </div>}
            {mobile ?
                <button id="burger-button" onClick={toggleVisibility}>
                    <img src={process.env.PUBLIC_URL + "./icons/burger.svg"} />
                </button>
            :
                (
                    <ul>
                        <li><NavLink className="nav-link" to={"/cart"}>Cart</NavLink></li>
                        <li><NavLink className="nav-link" to={"/account"}>Account</NavLink></li>
                    </ul>
                )}

        </header>
    );
}

export default Header;