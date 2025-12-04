import React, {createContext, useState, useCallback} from "react";
import {Snackbar, Alert} from "@mui/material";

export const IssueAlertContext = createContext();

export const IssueAlert = ({children}) => {

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "info"
    });

    const showAlert = useCallback((message, severity = "info") => {
        setAlert({
            open: true,
            message,
            severity
        });
    }, []);

    const handleClose = () => {
        setAlert(prev => ({...prev, open: false}));
    };

    return (
        <IssueAlertContext.Provider value={{showAlert}}>
            {children}

            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
            >

                <Alert onClose={handleClose} severity={alert.severity} sx={{width: "200%"}} variant="filled"
                       icon={false}>
                    {alert.message}
                </Alert>

            </Snackbar>
        </IssueAlertContext.Provider>
    );
};