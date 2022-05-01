// src/api/books.js

import apiUrl from "../apiConfig"
import axios from "axios"

// INDEX - get all books
export const getAllBooks = () => {
    return axios(`${apiUrl}/books`)
}

// SHOW - get one book
export const showBook = (bookId) => {
    return axios(`${apiUrl}/books/${bookId}`)
}
