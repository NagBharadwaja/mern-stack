import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { useAuthContext } from "../hooks/useAuthContext";

const EMPTY_ARRAY = [];

export const CreateExercise = () => {
    const [usersList, setUsersList] = useState([]);
    const [username, setUsername] = useState(usersList[0]);
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState();
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState("");

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchData = () => {
            axios.get(
                "http://localhost:5000/api/users",
                {
                    "headers": {
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            )
            .then(res => {
                console.log(res.data);
                if (res.data.length > 0) {
                    const usernames = (res.data).map(user => user.username);
                    console.log(usernames);
                    setUsersList(usernames);
                    setUsername(usernames[0])
                }
            })
            .catch(err => {
                console.log(`Error fetching users: ${err}`);
                setError(`Error fetching users: ${err}`);
            });
        }

        if (user) {
            fetchData();
        } else {
            setError("Log in to create exercise");
        }
    }, [user]);

    const handleUsernameChange = e => {
        e.stopPropagation();
        setUsername(e.target.value);
    }

    const handleDescriptionChange = e => {
        e.stopPropagation();
        setDescription(e.target.value);
    }

    const handleDurationChange = e => {
        e.stopPropagation();
        setDuration(e.target.value);
    }

    const handleDateChange = date => {
        setDate(date);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(!user?.token) {
            setError("Log in to create exercise");
            return;
        }

        const exercise = {
            username,
            description,
            duration,
            date,
        };
        console.log("Exercise: ", exercise);

        axios.post("http://localhost:5000/exercises/add",exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(`Error in exercise creation: ${err}`));
        window.location = '/';
    }

    return (
        <div>
            {
                error ? (
                    <p>{error}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User name</label>
                            <select
                                className="form-control"
                                onChange={handleUsernameChange}
                                required
                                value={username}
                            >
                                {usersList.map(user => (
                                        <option key={user} value={user}>{user}</option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" onChange={handleDescriptionChange} required value={description} />
                        </div>
                        <div className="form-group">
                            <label>Duration (in minutes)</label>
                            <input type="text" className="form-control" onChange={handleDurationChange} required value={duration} />
                        </div>
                        <div className="form-group">
                            <label>Date</label><br />
                            <DatePicker selected={date} onChange={handleDateChange} />
                        </div>

                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Create Exercise" />
                        </div>
                    </form>
                )
            }
        </div>
    );
}