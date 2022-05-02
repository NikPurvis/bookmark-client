// src/api/profile.js

import apiUrl from "../apiConfig"
import axios from "axios"


// SHOW - get one profile
export const showProfile = (userId) => {
    return axios(`${apiUrl}/profile/${userId}`)
}

// // SHOW - get user's profile
// export const showMyProfile = (user) => {
//     return axios({
//         url:`${apiUrl}/profile/mine`,
//         method: "GET",
//         headers:{
//             Authorization: `Token token=${user.token}`
//         }
//     })
// }

// // No longer necessary, profile is created alongside new user
// // POST - create new profile
// export const createProfile = (user, newProfile) => {
//     return axios({
//         url:`${apiUrl}/profile/new`,
//         method:"POST",
//         headers:{
//             Authorization: `Token token=${user.token}`
//         },
//         data: { profile: newProfile }
//     })
// }

// PATCH - update profile
export const updateProfile = (user, updatedProfile) => {
    return axios({
        url:`${apiUrl}/profile/${updatedProfile.id}`,
        method: "PATCH",
        headers:{
            Authorization: `Token token=${user.token}`
        },
        data: { profile: updatedProfile }
    })
}
