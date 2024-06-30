import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "./hooks/UserContext";

const ProtectedRoute = ({element}: {element: JSX.Element}) => {
    const {user} = useContext(UserContext);
    const storedUser = localStorage.getItem("user");

    if (user || storedUser) {
        return element;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
