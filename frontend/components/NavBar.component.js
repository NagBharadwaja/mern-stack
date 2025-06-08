import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const logoutBtnStyles = {
    background: "none",
	color: "#ffffff8c",
	border: "none",
	padding: 0,
	font: "inherit",
	cursor: "pointer",
	outline: "inherit",
}

export const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <Link to={"/"} className="navbar-brand">ExerTracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {user &&
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Exercises</Link>
                            </li>
                        }
                        {user && 
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Exercise Log</Link>
                            </li>
                        }
                        {user && 
                            <li className="navbar-item">
                                <Link to="/user" className="nav-link">Create User</Link>
                            </li>
                        }
                        {
                            user && 
                            (
                                <>
                                    <span>{user.email}</span>
                                    <li className="navbar-item">
                                        <button onClick={handleLogout} style={logoutBtnStyles}>Log out</button>
                                    </li>
                                </>
                            )
                        }
                        {
                                !user && 
                                (
                                    <>
                                        <li className="navbar-item">
                                            <Link to="/login" className="nav-link">Log in</Link>
                                        </li>
                                        <li className="navbar-item">
                                            <Link to="/signup" className="nav-link">Sign up</Link>
                                        </li>
                                    </>
                                )
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
};