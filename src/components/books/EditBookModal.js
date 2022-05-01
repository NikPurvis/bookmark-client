import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import { updateBook } from "../../api/books"
import BookForm from "../shared/BookForm"

const EditBookModal = (props) => {
    const { user, show, handleClose, updateBook, triggerRefresh } = props
    const [book, setBook] = useState(props.book)

    const handleChange = (e) => {
        e.persist()
        setBook(prevBook => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]: value }
            return {...prevBook, ...updatedValue}
            })
        }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateBook(user, book)
            .then(() => handleClose())
            .then(()=> triggerRefresh())
            .catch(console.error)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="bg-dark text-info">
                <BookForm 
                    book={setBook}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit book details"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBookModal
