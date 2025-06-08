import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState("");

    const { user } = useAuthContext();

    useEffect(() => {
        if (!user?.token) {
            setError("Log in to create user");
        }
    }, [user])

    const handleUsernameChange = e => {
        e.stopPropagation();
        setUsername(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!user?.token) {
            setError("Log in to create user");
            return;
        }
        const user = {
            username
        }
        console.log('User: ', user);
        axios.post(
            "http://localhost:5000/api/users/add",
            user,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        )
        .then(res => console.log(res.data))
        .catch(err => console.log(`Error processing user creation: ${err}`));
        
        setUsername('');
    }

    return (
        <div>
            {
                error ? (
                    <p>{error}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Enter new user name</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={handleUsernameChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                    </form>
                )
            }
        </div>
    )
};