import React from 'react'
import App from "./App";
import {Auth} from "./context/auth/Auth";
import {Books} from "./context/book/Books";
import {Review} from "./context/review/Review";
import {BrowserRouter as Router} from "react-router-dom";
import {Loved} from "./context/list/Loved";

export const Container = ({children}) => {
    return (
        <Router>
            <Auth>
                <Books>
                    <Loved>
                        <Review>
                            <App>
                                {children}
                            </App>
                        </Review>
                    </Loved>
                </Books>
            </Auth>
        </Router>
    )
}
