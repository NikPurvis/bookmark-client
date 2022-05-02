import React, { useEffect, useState } from "react"
import { Card, Button, Container } from "react-bootstrap"
import { removeReview } from "../../api/reviews"
import EditReviewModal from "./EditReviewModal"

const ShowReview = (props) => {
    const {review, book, user, triggerRefresh, msgAlert, handleClose} = props
    const [showEditModal, setShowEditModal] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [hidden, setHidden] = useState(false)
    
    const deleteReview = () => {
        removeReview(user, book._id, review._id)
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: "Uh-oh...",
                    message: "Something went wrong.",
                    variant: "danger",
                })
            })
    }


    return (
        <>
            <Card className="m-2">
                <Card.Body>
                    <h4>Subject: {review.subject}<br/></h4>
                    <h4>Rating: {review.stars}</h4>
                    <p>{review.text}</p>
                    {
                        user && (user._id === review.owner)
                        ?
                        <>
                            <Button variant="success" size="sm" onClick={() => setShowEditModal(true)}>
                                Edit review
                            </Button>
                            <Button onClick={()=> deleteReview()}variant="danger" size="sm">
                                Delete review
                            </Button>
                        </>
                        : null
                    }<br/>
                </Card.Body>
            </Card>

            <EditReviewModal 
                user={user}
                book={book}
                review={review}
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowReview
