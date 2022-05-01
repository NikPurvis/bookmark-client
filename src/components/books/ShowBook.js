import React, { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Spinner,Container,Card, Button} from 'react-bootstrap'
import {showBook} from '../../api/books'

const ShowBook = (props) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [book, setBook] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()
    const {user,msgAlert} = props

    useEffect(() => {
        showBook(id)
            .then(book => {
                setBook(book.data.book)
            })
            .catch(console.error)
    },[updated])

    if(!book) {
        return (
            <Container>
                <Spinner animation="border" role='status'>
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>

        )
    }

    return (
        <>
        <Container className='fluid'> 
            <Card className='text-info bg-dark'>
                <Card.Header className="display-4">{book.title}</Card.Header>
                <Card.Header><img src={`${book.cover}`} width='175' height='300'/></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Card.Header>Author: {book.author}</Card.Header><br/>
                        <Card.Header>Publication: {book.publicadtion}</Card.Header><br/>
                        <Card.Header>ISBN: {book.isbn}</Card.Header><br/>
                        <Card.Header>Genre: {book.genre}</Card.Header><br/>
                        <Card.Header>Description: {book.description}</Card.Header><br/>
                        <Card.Header>Reviews: {book.reviews}</Card.Header><br/>

                    </Card.Text>
                        {/* <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Book
                        </Button>
                        {/* delete button */}
                        {/* <Button onClick={() => deleteBook()} className="m-2" variant="danger">
                            Delete Book
                        </Button> */} 
                </Card.Body>
            </Card>
        </Container>
        {/* <EditBookModel 
                book={book}
                show={modalOpen}
                user={user}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateBook={updateBook}
                handleClose={() => setModalOpen(false)}
            /> */}
        </>

    )
}

export default ShowBook