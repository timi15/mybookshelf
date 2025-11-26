import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from "axios";
import {AuthContext} from "../auth/Auth";

export const ReviewContext = createContext();

export const Review = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/v1/mybookshelf/book-review/all', {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        }).then(res => {
            setReviews(res.data);
        })
    })

    return (
        <ReviewContext.Provider value={{reviews}}>
            {children}
        </ReviewContext.Provider>
    )
}
