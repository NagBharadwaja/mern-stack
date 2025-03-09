import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "Bootstrap/dist/css/bootstrap.min.css";

// User made styles and components
import "App.css";
import { NavBar } from "./components/NavBar.component";
import { ExercisesList } from "./components/ExercisesList.component";
import { EditExercise } from "./components/EditExercise.component";
import { CreateExercise } from "./components/CreateExercise.component";
import { CreateUser } from "./components/CreateUser.component";

const App = (/* { navigateToHome, setNavigateToHome } */) => {

    // useEffect(() => {
    //     if (!!navigateToHome) {
    //         setNavigateToHome(true);
    //     }
    // }, [navigateToHome, setNavigateToHome])

    return (
        <div>
            <div className="container">
                <NavBar />
                <br/>
                <Routes>
                    <Route path="/" exact element={<ExercisesList />}></Route>
                    <Route path="/edit/:id" element={<EditExercise />}></Route>
                    <Route path="/create" element={<CreateExercise />}></Route>
                    <Route path="/user" element={<CreateUser />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default App;