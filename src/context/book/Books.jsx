import React, {createContext, useEffect, useState} from 'react'
import axios from "axios";

export const BookContext = createContext();

export const Books = ({children}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.REACT_APP_BOOK_API_KEY}`
        )
            .then(res => {
                const lists = res.data.results.lists;

                console.log(lists);

                const formatted = lists.map((list) => ({
                    genre: list.display_name,
                    books: list.books.map((b) => ({
                        isbn13: b.primary_isbn13,
                        title: b.title,
                        image: b.book_image,
                        author: b.author,
                        plot: b.description
                    }))
                }));

                console.log(formatted);
                setData(formatted);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <BookContext.Provider value={{data}}>
            {children}
        </BookContext.Provider>
    )
}
