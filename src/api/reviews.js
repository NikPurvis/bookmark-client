// src/api/reviews.js

import apiUrl from "../apiConfig"
import axios from "axios"

// // INDEX - get all books
// export const getAllBooks = () => {
//     return axios(`${apiUrl}/books`)
// }

// // SHOW - get one book
// export const showBook = (bookId) => {
//     return axios(`${apiUrl}/books/${bookId}`)
// }

// POST - create new review
export const createReview = (user, bookId, newReview) => {
    return axios({
        url:`${apiUrl}/reviews/${bookId}`,
        method:"POST",
        headers:{
            Authorization: `Token token=${user.token}`
        },
        data: { review: newReview }
    })
}

// PATCH - update review
export const updateReview = (user, bookId, reviewId, updatedReview) => {
    return axios({
        url:`${apiUrl}/reviews/${bookId}/${reviewId}`,
        method: "PATCH",
        headers:{
            Authorization: `Token token=${user.token}`
        },
        data: { review: updatedReview }
    })
}

// DELETE - remove a review
export const removeReview = (user, bookId, reviewId) => {
    console.log("user:", user)
    return axios({
        url: `${apiUrl}/reviews/${bookId}/${reviewId}`,
        method: "DELETE",
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
