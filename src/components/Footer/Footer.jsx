import React from "react";
import "./Footer.css"



function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return(
        <>
        <footer>
            {/* <div>
                <h2>section1</h2>
                <ul>
                    <li><a href="">veni</a></li>
                    <li><a href="">vidi</a></li>
                    <li><a href="">vici</a></li>
                </ul>  
            </div>
            <div>
                <h2>section2</h2>
                <ul>
                    <li><a href="">vivere</a></li>
                    <li><a href="">est</a></li>
                    <li><a href="">cogitare</a></li>
                </ul>
            </div>
            <div>
                <h2>section3</h2>
                <ul>
                    <li><a href="">amor</a></li>
                    <li><a href="">vicit</a></li>
                    <li><a href="">omnia</a></li>
                </ul>
            </div>
            <div>
                <h2>section4</h2>
                <ul>
                    <li><a href="">fortes</a></li>
                    <li><a href="">fortuna</a></li>
                    <li><a href="">adiuvat</a></li>
                </ul>
            </div> */}
            <p>@Copyrights {year} Mateusz Szmorliński</p>
        </footer>
        </>        
    );
}

export default Footer;