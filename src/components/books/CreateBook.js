import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createBook } from '../../api/books'
import BookForm from "../shared/BookForm"
import { useNavigate } from 'react-router-dom'

const CreateBook = (props) => {
    const navigate = useNavigate()
    const[book, setBook] = useState({
        title:"",
        author:"",
        publication:"",
        cover:"",
        isbn:"",
        genre:"", 
        description:""})
    const {user} = props

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
        createBook(user, book)
            .then(res=> 
                {navigate(`/books/${res.data.book.id}`)})
            .catch(console.error)
    }

    return (
        <div className="text-info bg-dark">
            <BookForm
            book={book}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading='Add new book'
        />
        </div>
        )

}

export default CreateBook
