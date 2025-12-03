import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../auth/Auth";

export const LovedBooksContext = createContext();

export const Loved = ({children}) => {

    const {idToken} = useContext(AuthContext);
    const [lovedBooks, setLovedBooks] = useState([]);

    useEffect(() => {
        if (!idToken) {
            setLovedBooks([]);
            return;
        }

        axios.get(`http://localhost:8080/v1/mybookshelf/loved`, {
            headers: {
                "Authorization": `Bearer ${idToken}`,
            }
        })
            .then(res => {
                const books = res.data.map(item => item.book);
                setLovedBooks(books);
                console.log(books);
            })
    }, [idToken])

    const handleAddLovedBook = async (book) => {
        try {
            await axios.post(
                `http://localhost:8080/v1/mybookshelf/loved/add`,
                book,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`
                    }
                }
            ).then(res => {
                console.log(res.data);
                setLovedBooks(prev => [...prev, res.data]);
            });
            return true;

        } catch (err) {
            return false;
        }
    };

    const handleRemoveLovedBook = async (isbn13) => {

        setLovedBooks(lovedBooks.filter((value) => value.isbn13 !== isbn13));

        try {
            await axios.delete(
                `http://localhost:8080/v1/mybookshelf/loved/${isbn13}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`
                    }
                }
            )
            return true;

        } catch (err) {
            return false;
        }
    };


    return (
        <LovedBooksContext.Provider value={{lovedBooks, handleAddLovedBook, handleRemoveLovedBook}}>
            {children}
        </LovedBooksContext.Provider>
    );
};
