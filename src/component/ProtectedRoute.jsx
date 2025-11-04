import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/auth/Auth";

export const ProtectedRoute = ({children}) => {
    const {currentUser, loading} = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // TODO: spinner or skeleton
    }

    if (!currentUser) {
        return <Navigate to="/sign-in" replace/>;
    }

    return children;
};