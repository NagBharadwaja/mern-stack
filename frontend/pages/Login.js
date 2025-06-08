import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        console.log(`Log in: ${email} - ${password}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input type="email" onChange={e => { setEmail(e.target.value) }} value={email} />
            <br/>
            <label>Password:</label>
            <input type="password" onChange={e => { setPassword(e.target.value) }} value={password} />
            <br/>
            <button disabled={isLoading}>Log in</button>
            {error && <div>{error}</div>}
        </form>
    )
}