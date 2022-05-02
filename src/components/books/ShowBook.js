import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Spinner, Container, Card, Button, CloseButton } from "react-bootstrap"

import { getOneBook, updateBook, removeBook } from "../../api/books"
import { removeReview } from "../../api/reviews"
import { getShelf, addToShelf, deleteFromShelf } from "../../api/shelf"
import ShowReview from "../reviews/ShowReview"
import CreateReview from "../reviews/CreateReview"
import EditBookModal from "./EditBookModal"


const ShowBook = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [book, setBook] = useState(null)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, msgAlert, triggerRefresh } = props


    useEffect(() => {
        getOneBook(id)
        .then(res => {
            setBook(res.data.book)
        })
        .catch(console.error)
    },[updated])

    // useEffect(() => {
    //     // Axios call for show book
    //     getOneBook(id)
    //         .then(res => {
    //             setBook(res.data.book)
    //             // makingShelf()
    //         })
    //         .catch(console.error)
    // },[updated])


    // Deleting a book
    const deleteThisBook = () => {
        removeBook(user, id)
        .then(() => {
            msgAlert({
                heading: "Deleted!",
                message: "Book successfully removed.",
                variant: "success"
            })
        })
        .then(() => {navigate("/")})
        .catch(() => {
            msgAlert({
                heading: "Uh oh...",
                message: "Delete failed",
                variant: "danger"
            })
        })
    }


    // // Adding book to shelf
    // const shelfAddition = () => {
    //     const newShelvedBook = {
    //         owner: user._id,
    //         book: book._id
    //     }
    //     addToShelf(user, newShelvedBook)
    //         .then(()=> {
    //             setUpdated(prev => !prev)
    //             navigate(`/book/${book._id}`)
    //         })
    //         .then(() => {
    //             msgAlert({
    //                 heading: "Book added",
    //                 message: "This book is now on your bookshelf.",
    //                 variant: "success",
    //             })
    //         })
    //     .catch(error => console.log(error))
    // }

    // const makingShelf = () => {
    //     let shelfArray = []
    //     getShelf()
    //         .then(res => {
    //             shelfArray = res.data.shelf
    //             return shelfArray
    //         })
    //         .catch(error => console.log(error))
    // }

    // let allTheseReviews
    // 
    // if (book) {
    //     if (book.reviews.length > 0 ) {
    //         allTheseReviews = book.reviews.map(review => (
    //             review.owner === user._id

    //             <ShowReview key={review._id} created={rewview.created} subject={review.subject} review={review} book={book} user={user}
    //             triggerRefresh={()=> setUpdated(prev=> !prev)}
    //             />
    //         ))
    //     }
    // }

    const removeThisReview = (book, review) => {
        removeReview(user, book, review)
        .then(() => setUpdated(true))
        .catch(() => {
            msgAlert({
                heading: "Uh oh...",
                message: "Something went wrong.",
                variant: "danger",
            })
        })
    }


    // What to do while API call is running
    if(!book) {
        return (
            <Container>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }


    // What to do with data from the API call
    return (
        <>
        <Container className="fluid"> 
            <Card className="text-info bg-dark">
                <Card.Header className="display-4">{book.title} by {book.author}</Card.Header>
                
                <Card.Body>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-3">
                                <img src={`${book.cover}`} width="100%" height="300"/>
                            </div>
                            <div class="col-5">
                                <Card.Header>First Published: <strong>{book.publication}</strong></Card.Header><br/>
                                <Card.Header>ISBN: <strong>{book.isbn}</strong></Card.Header><br/>
                                <Card.Header>Genre: <strong>{book.genre}</strong></Card.Header><br/>
                            </div>
                        </div>
                        <div class="row">
                            <Card.Header>
                                <br />{book.description}
                            </Card.Header>
                        </div>
                    </div>
                </Card.Body>

                {user ?
                <>
                    <Card.Body>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <Button onClick={() => setModalOpen(true)} className="m-2" variant="success">
                                    Edit Book
                                    </Button>
                                    <Button onClick={() => deleteThisBook()} className="m-2" variant="danger">
                                        Delete Book
                                    </Button>
                                    <Button onClick={()=> setReviewModalOpen(true)} className="m-2" variant="warning">
                                        Review book
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </> : null }<br />



                <Card.Body className="bg-secondary col-9 offset-1">
                <div class="container">
                    <div class="row">
                        <div class="col-10 offset-1">
                        <h3 className class="text-light">Reviews:</h3>


                        {book.reviews.map((review) => (
                            <div class="card bg-dark">
                                <Card.Header className="card-title">
                                    {review?.owner === user?._id &&
                                    <CloseButton className="btn-close-white" onClick={() => removeThisReview(book?._id, review?._id)}/>} 
                                    <strong><span class="text-warning">{review.subject}</span></strong>
                                    <a className="comment-card-username" href={`/profile/${review.owner}`}></a> <i>({user.email})</i>
                                </Card.Header>
                                <Card.Body>
                                    {review.text}
                                </Card.Body>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                </Card.Body><br />
            </Card>
        </Container><br /><br />

        <CreateReview
            user={user}
            book={book}
            show={reviewModalOpen}
            triggerRefresh={() => setUpdated(prev => !prev)}
            handleClose={()=> setReviewModalOpen(false)}
        />

        <EditBookModal 
                book={book}
                show={modalOpen}
                user={user}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateBook={updateBook}
                handleClose={() => setModalOpen(false)}
            />

        </>
    )
}

export default ShowBook
