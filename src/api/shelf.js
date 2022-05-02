// src/api/shelf.js

import apiUrl from "../apiConfig"
import axios from "axios"

// SHOW - get specific user's bookshelf
export const getShelf = (user) => {
    return axios({
        url:`${apiUrl}/bookshelf`,
        method: "GET",
        headers: {
            Authorization:`Token token=${user.token}`
        }
    })
}

// PATCH - add book to shelf
export const addToShelf = (user, newShelvedBook) => {
    return axios({
        url:`${apiUrl}/bookshelf`,
        method:"POST",
        headers: {
            Authorization:`Token token=${user.token}`
        },
        data:{ shelf: newShelvedBook }
    })
}

// DELETE - remove book from shelf
export const deleteFromShelf = (user, bookId) => {
    return axios({
        url:`${apiUrl}/bookshelf/${bookId}`,
        method:"DELETE",
        headers: {
            Authorization:`Token token=${user.token}`
        }
    })
}
