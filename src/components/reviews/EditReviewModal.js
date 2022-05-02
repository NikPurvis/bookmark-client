import React, { useState } from "react"
import {Modal} from "react-bootstrap"
import ReviewForm from "../shared/ReviewForm"
import {updateReview} from "../../api/reviews.js"

const EditReviewModal = (props) => {
    const { user, book, show, handleClose, msgAlert, triggerRefresh } = props
    const [review, setReview] = useState(props.review)

    const handleChange = (e) => {
        e.persist()

        addUsertoReview()

        setReview(prevReview => {
            const name = e.target.name
            let value = e.target.value

            // Rating is a number, so making sure it goes into the database as one.
            if (e.target.type === "number") {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }
            return {...prevReview, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateReview(user, book._id, review._id, review)
            // if create is successful, return to the book page...
            .then(() => handleClose())
            // ...and show the updated view.
            .then(() => triggerRefresh())
            // Handle errors if any.
            .then(() => handleClose())
    }

    const addUsertoReview = () => {
        setReview(prevReview => {
            const updatedValue = {"owner": user._id}
            return {...prevReview , ...updatedValue}
        })
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ReviewForm
                    review={review}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Review book"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditReviewModal
