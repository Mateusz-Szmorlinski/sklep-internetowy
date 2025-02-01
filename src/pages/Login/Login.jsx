import React, { useState } from "react";
import "./Login.css";
import { useUser } from "../../Data/Users/Users";
import { useNavigate } from "react-router-dom";

function Login() {
    const { loginUser } = useUser();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    function handleLogin(event) {
        let { value } = event.target;
        setEmail(value);
    }

    function handlePassword(event) {
        let { value } = event.target;
        setPassword(value);
    }

    async function loginSubmit(event) {
        event.preventDefault();
        await loginUser(email, password);
        navigate("/account");
    }

    return (
        <section id="login">
            <div id="login-wrapper">
                <form id="form" onSubmit={loginSubmit}>
                    <input
                        type="text"
                        placeholder="email"
                        onChange={handleLogin}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={handlePassword}
                        value={password}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
        
    );
}

export default Login;