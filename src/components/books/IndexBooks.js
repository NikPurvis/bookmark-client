import React, {useState, useEffect } from 'react'
import { getAllBooks } from '../../api/books'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexBooks = (props) => {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        getAllBooks()
            .then(res=> {
                setBooks(res.data.books)
            })
            .catch(console.error)
    },[])


    if (!books) {
        return <p>loading...</p>
    } else if (books.length === 0) {
        return <p>No books to display. Go Create some!</p>
    }


    let bookCards

    if (books.length > 0) {
        bookCards = books.map(book => (
            <Card key={book.id} style={{ width: '20%', border:"solid 1px"}} className="m-2 bg-dark text-info"  >
                <Card.Header><strong>{book.title}</strong></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to ={`/books/${book._id}`}><img src={`${book.cover}`} width='175' height='300'/></Link><br /><br />
                        <strong>{book.author}</strong>
                        <p>{book.publication} {book.genre}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <div className='bg-dark'>
            <h3 class='text-center'>books</h3>
            <div style={cardContainerLayout}>
                {bookCards}
            </div>
        </div>
    )
}


export default IndexBooks
