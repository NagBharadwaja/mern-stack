import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import "Bootstrap/dist/css/bootstrap.min.css";

// User made styles and components
import "App.css";
import { NavBar } from "./components/NavBar.component";
import { ExercisesList } from "./components/ExercisesList.component";
import { EditExercise } from "./components/EditExercise.component";
import { CreateExercise } from "./components/CreateExercise.component";
import { CreateUser } from "./components/CreateUser.component";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ErrorBoundary } from "./ErrorBoundary";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
    const { user } = useAuthContext();

    return (
        <div>
            <div className="container">
                <NavBar />
                <br/>
                <Routes>
                    <Route path="/"
                        exact
                        element={
                            user
                            ? <ExercisesList />
                            : <Navigate to="/login" />
                        }
                    />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}/>
                    <Route path="/signup" element={
                        !user
                        ? (
                            <ErrorBoundary fallback={<p>Something went wrong in Signup process</p>}>
                                <Signup />
                            </ErrorBoundary>
                        )
                        : <Navigate to="/" />
                    }/>
                    <Route path="/edit/:id" element={user ? <EditExercise /> : <Navigate to="/login" />}/>
                    <Route path="/create" element={user ? <CreateExercise /> : <Navigate to="/login" />}/>
                    <Route path="/user" element={user ? <CreateUser /> : <Navigate to="/login" />}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;