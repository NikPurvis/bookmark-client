import React, { useState } from "react"
import { Form, Container, Button } from "react-bootstrap"

const ProfileForm = (props) => {
    const {profile, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    placeholder="Display name"
                    value={profile.username}
                    name="username"
                    onChange={handleChange}
            />

                <Form.Label>Location</Form.Label>
                <Form.Control
                    placeholder="Your location"
                    value={profile.location}
                    name="location"
                    onChange={handleChange}
                />

                <Form.Label>Favorite Books</Form.Label>
                    <Form.Control
                        placeholder="A few of your favorite books"
                        value={profile.fav_books}
                        name="fav_books"
                        onChange={handleChange}
                />

                <Form.Label>Favorite Authors</Form.Label>
                    <Form.Control
                        placeholder="A few of your favorite authors"
                        value={profile.fav_authors}
                        name="fav_authors"
                        onChange={handleChange}
                />

                <Form.Label>Favorite Genres</Form.Label>
                    <Form.Control
                        placeholder="A few of your favorite genres"
                        value={profile.genres}
                        name="fav_genres"
                        onChange={handleChange}
                />
                
                <Form.Label>Quote</Form.Label>
                    <Form.Control
                        placeholder="Your favorite quote"
                        value={profile.quote}
                        name="quote"
                        onChange={handleChange}
                />

                <Button type="submit">Submit</Button>
            </Form>

        </Container>
    )
}

export default ProfileForm
