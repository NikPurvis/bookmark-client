// src/api/books.js

import apiUrl from "../apiConfig"
import axios from "axios"

// INDEX - get all books
//
export const getAllBooks = () => {
    return axios(`${apiUrl}/books`)
}
