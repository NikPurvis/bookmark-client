import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Spinner, Container, Card, Button} from "react-bootstrap"

import { showProfile, updateProfile } from "../../api/profile"
import EditProfileModal from "./EditProfileModal"


const ShowProfile = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [profile, setProfile] = useState(null)
    let { id } = useParams()
    const navigate = useNavigate()
    const { user, msgAlert } = props

    // Conditional to set the API call ID to the required user object, if we're trying to call a profile without a URL parameter.
    // (i.e., letting "your profile" apply to whichever user is logged in)    
    if (id === ":id") {
        id = user._id
    }

    useEffect(() => {
        showProfile(id)
            .then(profile => {
                setProfile(profile.data.profile)
            })
            .catch(console.error)
    },[updated])


    // What to do while API call is running
    if (!profile) {
        return (
            <Container>
                <br />
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    // What to do with data from the API call
    return (
        <>
            <br />
            <Container className="fluid">
                <Card className="text-info bg-dark">
                    <Card.Header className="display-4">
                            Your User Profile
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Card.Header>Username: {profile.username}</Card.Header><br/>
                            <Card.Header>Location: {profile.location}</Card.Header><br/>
                            <Card.Header>Favorite Books: {profile.fav_books}</Card.Header><br/>
                            <Card.Header>Favorite Authors: {profile.fav_authors}</Card.Header><br/>
                            <Card.Header>Favorite genres: {profile.genres}</Card.Header><br/>
                            <Card.Header>Favorite quote: {profile.quote}</Card.Header><br/>
                        </Card.Text>

                        {/* Conditional to check if user is profile owner and render action buttons accordingly */}
                        {user && (user._id === profile.owner)
                            ?
                                <>
                                    <Button variant="success" size='sm' onClick={() => setModalOpen(true)}>
                                        Edit Profile
                                    </Button>
                                </>
                            :
                                null
                        }<br/>
                    </Card.Body>
                </Card>
            </Container>

            { <EditProfileModal
                    user={user}
                    profile={profile}
                    show={modalOpen}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    updateProfile={updateProfile}
                    handleClose={() => setModalOpen(false)}
                />
            }
        </>
    )
}

export default ShowProfile
