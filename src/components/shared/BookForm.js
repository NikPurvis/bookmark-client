import React, { useState } from "react"
import { Form, Container, Button } from "react-bootstrap"

const BookForm = (props) => {
    const {book, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    placeholder="Book title"
                    value={book.title}
                    name="title"
                    onChange={handleChange}
            />

                <Form.Label>Author</Form.Label>
                <Form.Control
                    placeholder="Name of author"
                    value={book.author}
                    name="author"
                    onChange={handleChange}
            />

                <Form.Label>Publication</Form.Label>
                    <Form.Control
                        placeholder="Publication Year"
                        value={book.publication}
                        name="publication"
                        onChange={handleChange}
                />

                <Form.Label>Cover</Form.Label>
                    <Form.Control
                        placeholder="Cover image"
                        value={book.cover}
                        name="cover"
                        onChange={handleChange}
                />

                <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        placeholder="ISBN Number"
                        value={book.isbn}
                        name="isbn"
                        onChange={handleChange}
                />
                
                <Form.Label>Genre</Form.Label>
                    <Form.Control
                        placeholder="Book genre"
                        value={book.genre}
                        name="genre"
                        onChange={handleChange}
                />

                <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Description of book (think back of the book blurb - no spoilers!)"
                        value={book.description}
                        name="description"
                        onChange={handleChange}
                />

                <Button type="submit">Submit</Button>
            </Form>

        </Container>
    )
}

export default BookForm
