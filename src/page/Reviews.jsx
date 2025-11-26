import React, {useContext, useState} from 'react'
import {ReviewContext} from "../context/review/Review";
import {Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Rating, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ReviewModal} from "../component/ReviewModal";

export const Reviews = () => {

    const {reviews} = useContext(ReviewContext);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (<>
            <div>
                <Button onClick={handleOpen}>Open modal</Button>

            </div>
            <div className="container" style={{
                margin: "3rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center"
            }}>
                {
                    reviews.map((review) => (
                        <Card
                            sx={{
                                width: 250,
                                borderRadius: 3,
                                boxShadow: 3,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: '#fafafa'
                            }}
                            key={review.isbn13}
                        >
                            <Box style={{padding: '1rem'}}>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {review.startDate} - {review.finishDate}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={review.image}
                                    alt={review.title}
                                    sx={{
                                        height: 250,
                                        width: 'auto',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                    }}
                                />
                            </Box>

                            {/* Tartalom */}
                            <CardContent sx={{textAlign: 'center'}}>
                                <Typography variant="h6" fontWeight="bold">
                                    {review.title}
                                </Typography>

                                <Typography variant="subtitle2" sx={{color: 'text.secondary', mb: 1}}>
                                    {review.author}
                                </Typography>

                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {review.plot}
                                </Typography>

                                <Rating name="read-only" value={review.rate} readOnly/>

                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {review.reflection}
                                </Typography>
                            </CardContent>

                            {/* Ikonok */}
                            <CardActions sx={{justifyContent: 'center'}}>
                                <IconButton color="primary">
                                    <EditIcon/>
                                </IconButton>

                                <IconButton color="error">
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>

                        </Card>

                    ))
                }

            </div>
            <ReviewModal open={open} close={handleClose}/>
        </>
    )
}
