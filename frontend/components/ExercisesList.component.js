import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const linkStyle = { textDecoration: 'none', color: 'black' };

export const ExercisesList = () => {
    const [exercisesList, setExercisesList] = useState([]);
    const [error, setError] = useState("");

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchData = () => {
            axios.get("http://localhost:5000/api/exercises", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    if (res.data.length) {
                        const exercises = res.data.map(exercise => {
                            return {
                                id: exercise._id,
                                username: exercise.username,
                                exercise: exercise.description,
                                duration: exercise.duration,
                                date: exercise.date,
                            }
                        });
                        setExercisesList(exercises);
                    }
                });
            }
            if (user) {
                fetchData();
            } else {
                setError("Log in to access exercises");
            }
    }, []);

    const handleDeleteExercise = (e, exerciseId) => {
        e.stopPropagation();
        if (!user) {
            setError("Log in to delete exercise");
        }
        axios.delete(`http://localhost:5000/exercises/${exerciseId}`)
            .then(res => {
                console.log(`Exercise ${exerciseId} deleted!`);
                const newExercises = exercisesList.filter(exercise => exercise.id !== exerciseId);
                setExercisesList(newExercises)
            })
            .catch(err => console.log(`Error deleting exercise: ${exerciseId}`));
    }

    return (
        <>
            {
                error
                ? (
                    <p>{error}</p>
                ) : (
                    <div className="form-group">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>User</th>
                                    <th>Exercise</th>
                                    <th>Duration</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {exercisesList.map(exercise => (
                                <tr key={exercise.id}>
                                    <td>{exercise.username}</td>
                                    <td>{exercise.exercise}</td>
                                    <td>{exercise.duration}</td>
                                    <td>{exercise.date.substring(0, 10)}</td>
                                    <td><button><Link to={`/edit/${exercise.id}`} style={linkStyle}>edit</Link></button></td>
                                    <td><button onClick={(e) => { handleDeleteExercise(e, exercise.id) }}>Delete</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            
        </>
    );
}