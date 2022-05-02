// src/api/books.js

import apiUrl from "../apiConfig"
import axios from "axios"

// INDEX - get all books
export const getAllBooks = () => {
    return axios(`${apiUrl}/books`)
}

// SHOW - get one book
export const getOneBook = (bookId) => {
    return axios(`${apiUrl}/books/${bookId}`)
}

// POST - create new book
export const createBook = (user, newBook) => {
    return axios({
        url:`${apiUrl}/books`,
        method:"POST",
        headers:{
            Authorization: `Token token=${user.token}`
        },
        data: { book: newBook }
    })
}

// PATCH - update book
export const updateBook = (user, updatedBook) => {
    return axios({
        url:`${apiUrl}/books/${updatedBook.id}`,
        method: "PATCH",
        headers:{
            Authorization: `Token token=${user.token}`
        },
        data: { book: updatedBook }
    })
}

// DELETE - remove a book
export const removeBook = (user, bookId) => {
    console.log("user:", user)
    return axios({
        url: `${apiUrl}/books/${bookId}`,
        method: "DELETE",
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
