import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import { updateProfile } from "../../api/books"
import ProfileForm from "../shared/ProfileForm"

const EditProfileModal = (props) => {
    const { user, show, handleClose, updateProfile, triggerRefresh } = props
    const [profile, setProfile] = useState(props.profile)

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

        updateProfile(user, profile)
            .then(() => handleClose())
            .then(()=> triggerRefresh())
            .catch(console.error)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="bg-dark text-info">
                <ProfileForm 
                    profile={setProfile}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit your profile"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditProfileModal
