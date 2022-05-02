import React, { useState } from "react"
import { Modal } from "react-bootstrap"

import ReviewForm from "../shared/ReviewForm"
import { createReview } from "../../api/reviews.js"


const CreateReviewModal = (props) => {
    const { user, book, show, handleClose, msgAlert, triggerRefresh } = props
    const [review, setReview] = useState({})

    const handleChange = (e) => {
        e.persist()

        addUsertoReview()
        
        setReview(prevReview => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]: value }
            return {...prevReview, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createReview(user, book._id, review)
            .then(() => handleClose())            
            .then(() => triggerRefresh())
            .catch(console.error) 
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
                    heading="Review Book"
                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateReviewModal
