import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  // Create navigate function using useNavigate

    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password
        };

        fetch("https://mymovielibrary-905482f59fde.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
                navigate('/');  // Navigate to the homepage
            } else {
                alert("User not found or password incorrect");
            }
        })
        .catch((e) => {
            alert("Login failed: " + e.message);
        });
    };

    return (
        <Card className="mt-4">
            <Card.Body>
                <h4>Log in</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label className="mt-2">Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className="mt-2">Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mt-3">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
