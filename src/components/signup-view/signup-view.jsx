import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export const SignUpView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data ={
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://mymovielibrary-905482f59fde.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json", 
            },
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Card className="mt-2">
            <Card.Body>
                <h4>Sign Up</h4>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signUpUsername">
            <Form.Label className="mt-2">
                Username: 
            </Form.Label>
                <Form.Control 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="signUpPassword">
            <Form.Label className="mt-2">
                Password:
            </Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                />
            </Form.Group>
            <Form.Group>
            <Form.Label className="mt-2">
                Email:
            </Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
            <Form.Label className="mt-2">
                Birthday:
            </Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit" variant="success" className="mt-3">Sign up</Button>
        </Form>
        </Card.Body>
        </Card>
    )
}