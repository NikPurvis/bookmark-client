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
    //                 heading: 'Book added',
    //                 message: 'This book is now on your bookshelf.',
    //                 variant: 'success',
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
                <Card.Header className="display-4">{book.title}</Card.Header>
                <Card.Header><img src={`${book.cover}`} width="175" height="300"/></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Card.Header>Author: {book.author}</Card.Header><br/>
                        <Card.Header>Publication: {book.publication}</Card.Header><br/>
                        <Card.Header>ISBN: {book.isbn}</Card.Header><br/>
                        <Card.Header>Genre: {book.genre}</Card.Header><br/>
                        <Card.Header>Description: {book.description}</Card.Header><br/>
                        {/* <Card.Header>Reviews: {book.reviews}</Card.Header><br/> */}
                    </Card.Text>

                    {/* <Button onClick={() => shelfAddition()} variant="outline-success">
                        Add book to shelf
                    </Button> */}

                    <Button onClick={() => setModalOpen(true)} className="m-2" variant="success">
                            Edit Book
                    </Button>
                    <Button onClick={() => deleteThisBook()} className="m-2" variant="danger">
                        Delete Book
                    </Button>

                    <Button onClick={()=> setReviewModalOpen(true)} className="m-2" variant="warning">
                        Review book
                    </Button>
                    
                    <h3 className class="text-primary">Reviews:</h3> 
                        {/* <p>{reviews}</p> */}

                    <CreateReview
                        user={user}
                        book={book}
                        show={reviewModalOpen}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                        handleClose={()=> setReviewModalOpen(false)}
                    />

                {book.reviews.map((review) => (
                        review?.owner === user?._id ?
                            (<Card style={{ width: '70%' }} className="comment-card">
                                <Card.Body>
                                    <div className="comment-date">
                                        {/* <small><Moment format="MMMM DD, YYYY">{comment.date}</Moment></small> */}
                                        <CloseButton className="comment-button" variant="light" onClick={() => removeThisReview(book?._id, review?._id)}/>
                                    </div>
                                    <div className="comment-card-body d-flex row-nowrap">
                                        <a className="comment-card-username" href={`/profile/${review.owner}`}>{review.subject}</a><br />
                                        {review.text}
                                    </div>
                                </Card.Body>

                            </Card>)
                            :
                            (<Card style={{ width: '70%' }} className="comment-card">
                                <Card.Body>
                                    <div className="comment-date">
                                        {/* <small><Moment format="MMMM DD, YYYY">{comment.date}</Moment></small> */}
                                    </div>
                                    <div className="comment-card-body d-flex row-nowrap">
                                        <a className="comment-card-username" href={`/profile/${review.owner}`}>{review.subject}</a><br />
                                        {review.text}
                                    </div>
                                </Card.Body>
                            </Card>)
                    ))}

                </Card.Body>
            </Card>
        </Container>

        { <EditBookModal 
                book={book}
                show={modalOpen}
                user={user}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateBook={updateBook}
                handleClose={() => setModalOpen(false)}
            />
        }

        </>

    )
}

export default ShowBook
