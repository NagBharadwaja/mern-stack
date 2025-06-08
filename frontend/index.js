import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";

// Old way
// ReactDOM.render(<App />, document.querySelector('#root'));

// Now
const domNode = document.querySelector("#root");
const root = createRoot(domNode);
root.render(<Router><App /></Router>);

// const domNode = document.querySelector("#root");
// const root = createRoot(domNode);

const AppWrapper = ({ navigateToHome }) => {
    // const [navigateToHome, setNavigateToHome] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (navigateToHome && !location.pathname) {
            navigate('/');
        }
    }, [navigateToHome, navigate])

    return (
        <React.StrictMode>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </React.StrictMode>
    )
}

const renderApp = ({ navigateToHome }) => {
    root.render(<Router><AppWrapper navigateToHome={navigateToHome ?? false} /></Router>);
}

renderApp({ navigate: false });

// Enable hot reloading of App and route to home
if (module.hot) {
    module.hot.accept('./App', () => {
        // Trigger navigation to home page
        // const setNavigateToHome = require('./App').setNavigateToHome;
        // setNavigateToHome(true);
        renderApp({ navigateToHome: true });
    })
}
