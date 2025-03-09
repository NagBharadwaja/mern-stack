import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const EMPTY_ARRAY = [];

export const EditExercise = () => {
    const { id } = useParams();
    const [usersList, setUsersList] = useState([]);
    const [username, setUsername] = useState(usersList[0]);
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/${id}`)
            .then(res => {
                if (res.data) {
                    setUsername(res.data.username);
                    setDescription(res.data.description);
                    setDuration(res.data.duration);
                    setDate((new Date(res.data.date)).substring(0, 10));
                }
            })
            .catch(err => console.log(`Error fetching exercise: ${id} - ${err}`));
        axios.get("http://localhost:5000/users")
            .then(res => {
                console.log(res.data);
                if (res.data.length > 0) {
                    const usernames = (res.data).map(user => user.username);
                    console.log(usernames);
                    setUsersList(usernames);
                }
            })
            .catch(err => console.log(`Error fetching users: ${err}`));
    }, []);

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
        const exercise = {
            username,
            description,
            duration,
            date,
        };
        console.log("Exercise: ", exercise);

        axios.put(`http://localhost:5000/exercises/update/${id}`,exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(`Error in updating exercise: ${err}`));
        window.location ='/';
    }

    return (
        <div>
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
                    <input type="submit" className="btn btn-primary" value="Edit Exercise" />
                </div>
            </form>
        </div>
    );
}