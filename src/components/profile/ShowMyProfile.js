// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"
// import { Spinner, Container, Card, Button} from "react-bootstrap"

// // import { showProfile, updateMyProfile } from "../../api/profile"
// import { showMyProfile, updateMyProfile } from "../../api/profile"
// // import EditProfileModal from "./EditProfileModal"


// const ShowMyProfile = (props) => {
//     const [modalOpen, setModalOpen] = useState(false)
//     const [updated, setUpdated] = useState(false)
//     const [profile, setProfile] = useState(null)
//     // const { id } = useParams()
//     const navigate = useNavigate()
//     const { user, msgAlert } = props

//     useEffect(() => {
//         showMyProfile(user.id)
//             .then(profile => {
//                 setProfile(profile.data.profile)
//             })
//             .catch(console.error)
//     },[updated])


//     // What to do while API call is running
//     if(!profile) {
//         return (
//             <Container>
//                 <br />
//                 <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//             </Container>
//         )
//     }

//     // // ******** if no profile
//     // // ******** 422 status
//     // import { AxiosResponse, AxiosError } from 'axios'

//     // axios.get('foo.com')
//     //   .then((response: AxiosResponse) => {
//     //     // Handle response
//     //   })
//     //   .catch((reason: AxiosError) => {
//     //     if (reason.response!.status === 400) {
//     //       // Handle 400
//     //     } else {
//     //       // Handle else
//     //     }
//     //     console.log(reason.message)
//     //   })


//     // What to do with data from the API call
//     return (
//         <>
//         <Container className="fluid">

//         <p>Username: {profile.username}</p>
//         <p>Location: {profile.username}</p>
//         <p>Fav books: {profile.username}</p>
//         <p>Fav authors: {profile.username}</p>
//         <p>Fav genres: {profile.username}</p>
//         <p>Fav quote: {profile.username}</p>

// {/* 

//             <Card className="text-info bg-dark">
//                 <Card.Header className="display-4">{book.title}</Card.Header>
//                 <Card.Header><img src={`${book.cover}`} width="175" height="300"/></Card.Header>
//                 <Card.Body>
//                     <Card.Text>
//                         <Card.Header>Author: {book.author}</Card.Header><br/>
//                         <Card.Header>Publication: {book.publication}</Card.Header><br/>
//                         <Card.Header>ISBN: {book.isbn}</Card.Header><br/>
//                         <Card.Header>Genre: {book.genre}</Card.Header><br/>
//                         <Card.Header>Description: {book.description}</Card.Header><br/>
//                         <Card.Header>Reviews: {book.reviews}</Card.Header><br/>

//                     </Card.Text> */}

//                     {/* <Button onClick={() => setModalOpen(true)} className="m-2" variant="success">
//                             Edit Profile
//                     </Button> */}
//                     {/* <Button onClick={() => deleteThisBook()} className="m-2" variant="danger">
//                         Delete Book
//                     </Button> */}

//                 {/* </Card.Body>
//             </Card> */}
//         </Container>

//         {/* { <EditProfileModal 
//                 profile={profile}
//                 show={modalOpen}
//                 user={user}
//                 triggerRefresh={() => setUpdated(prev => !prev)}
//                 updateProfile={updateProfile}
//                 handleClose={() => setModalOpen(false)}
//             />
//         } */}
//         </>
//     )
// }

// export default ShowMyProfile
