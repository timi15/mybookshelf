import React, {useContext, useState} from 'react'
import {Box, Button, Modal, Rating, TextField, Typography} from "@mui/material";
import axios from "axios";
import {AuthContext} from "../context/auth/Auth";
import "../assert/modal.css"

export const ReviewModal = ({book = {}, open, close}) => {


    const [formData, setFormData] = useState({})
    const [rate, setRate] = React.useState(2);
    const {idToken} = useContext(AuthContext);


    const handleSubmit = (e) => {
        e.preventDefault();

        const submit = {...book, rate, ...formData}
        axios
            .post('http://localhost:8080/v1/mybookshelf/book-review/save', submit, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            })
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data)
                }
            })

        console.log(submit);

    };


    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className="form modal-style"
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                }}
        }
            >

            <TextField
                label="ISBN13"
                disabled={book}
                fullWidth
                id="isbn13"
                name="isbn13"
                value={book.isbn13 || formData.isbn13}
                type="text"
                required
                onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
            />

            <TextField
                disabled={book}
                label="Image"
                fullWidth
                id="image"
                name="image"
                value={book.image || formData.image}
                type="text"
                required
                onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
            />

            <TextField
                disabled={book}
                label="Title"
                fullWidth
                id="title"
                name="title"
                value={book.title || formData.title}
                type="text"
                required
                onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
            />

            <TextField
                disabled={book}
                label="Author"
                fullWidth
                id="author"
                name="author"
                value={book.author || formData.author}
                type="text"
                required
                onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
            />


            <TextField
                disabled={book}
                label="Plot"
                multiline
                rows={2}
                fullWidth
                id="plot"
                name="plot"
                value={book.plot || formData.plot}
                required
                onChange={({target}) => setFormData({...formData, [target.name]: target.value})}

            />

            <div style={{margin: 'auto', paddingBottom: '1.5rem'}}>
                <Rating
                    name="rating"
                    value={rate}
                    onChange={(event, newValue) => {
                        setRate(newValue);
                    }}
                />
            </div>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "20px"}}>

                <TextField
                    fullWidth
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    type="date"
                    required
                    slotProps={{
                        input: {
                            inputProps: {
                                max: new Date().toISOString().split("T")[0]
                            }
                        }
                    }}
                    onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
                />


                <TextField
                    fullWidth
                    id="finishDate"
                    name="finishDate"
                    value={formData.finishDate}
                    type="date"
                    required
                    slotProps={{
                        input: {
                            inputProps: {
                                min: formData.startDate || "",
                                max: new Date().toISOString().split("T")[0]
                            }
                        }
                    }}
                    onChange={({target}) => setFormData({...formData, [target.name]: target.value})}
                />

            </div>


            <TextField
                multiline
                rows={2}
                fullWidth
                id="reflection"
                label="Reflection"
                name="reflection"
                value={formData.reflection}
                required
                onChange={({target}) => setFormData({...formData, [target.name]: target.value})}

            />

            <Button type="submit" variant="contained" size="large">
                Save
            </Button>

        </Box>
</Modal>
)
}
