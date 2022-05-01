import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createProfile } from '../../api/profile'
import ProfileForm from "../shared/ProfileForm"
import { useNavigate } from 'react-router-dom'

const CreateProfile = (props) => {
    const navigate = useNavigate()
    const[profile, setProfile] = useState({
        username: "",
        location: "",
        fav_books: "",
        fav_authors: "",  // Default placeholder image
        fav_genres: "",
        fav_quote: ""})
    const { user, msgAlert } = props

    const handleChange = (e) => {
        e.persist()
        setProfile(prevProfile => {
            const name = e.target.name
            let value = e.target.value
            const updatedValue = { [name]: value }
            return {...prevProfile, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("********", e)
        console.log("user:", user)
        console.log("profile", profile)
        createProfile(user, profile)
            .then(() => {
                console.log("user:", user)
                console.log("profile", profile)
            })
            .then(res=> 
                {navigate(`/profile/${res.data.user.id}`)})
            .then(() => {
                msgAlert({
                    heading: "Profile created",
                    message: "Congrats on the unbearable feeling of being known.",
                    variant: "success"
                })
            })
            .catch(() => {
                msgAlert({
                    heading: "Uh oh...",
                    message: "Something went wrong",
                    variant: "danger"
                })
            })
    }

    return (
        <div className="text-info bg-dark">
            <ProfileForm
            profile={profile}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading='Add your profile'
        />
        </div>
    )
}

export default CreateProfile
