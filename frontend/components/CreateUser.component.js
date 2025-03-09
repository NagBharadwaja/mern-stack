import React, { useState } from "react";
import axios from "axios";

export const CreateUser = () => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = e => {
        e.stopPropagation();
        setUsername(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            username
        }
        console.log('User: ', user);
        axios.post("http://localhost:5000/users/add", user)
            .then(res => console.log(res.data))
            .catch(err => console.log(`Error processing user creation: ${err}`));
        setUsername('');
    }

    return (
        <div>
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
        </div>
    )
};