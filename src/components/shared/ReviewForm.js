import React, { useState } from "react"
import { Form, Container, Button } from "react-bootstrap"

const ReviewForm = (props) => {
    const {review, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                    placeholder="Subject line for your review"
                    value={review.subject}
                    name="subject"
                    onChange={handleChange}
                />

                <Form.Label>Text</Form.Label>
                <Form.Control
                    placeholder="Review away!"
                    value={review.text}
                    name="text"
                    onChange={handleChange}
                />

                <Form.Label>Stars</Form.Label>
                    <Form.Control
                        placeholder="Enter rating, from 0 to 5 stars"
                        value={review.stars}
                        name="stars"
                        onChange={handleChange}
                />
{/* 
                <Form.Label>Finished?</Form.Label>
                    <Form.Control
                        placeholder="Did you finish the book?"
                        value={review.isFinished}
                        name="cover"
                        onChange={handleChange}
                /> */}
                
                <Button type="submit">Submit</Button>
            </Form>

        </Container>
    )
}

export default ReviewForm
