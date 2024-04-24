import { useParams } from "react-router";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';

export const MovieView = ({ movies, isFavorite }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [addTitle, setAddTitle] = useState("");
    const [removeTitle, setRemoveTitle] = useState("");

    const { movieId } = useParams();

        const movie = movies.find((m) => m.id === movieId);

        if (!movie) return <div>Movie not found</div>

        const handleAddToFavorites = () => {
            setAddTitle(movie.id);
        };
        const handleRemoveFromFavorites = () => {
            setRemoveTitle(movie.id);
        };

    return (

        <div className="container mt-4">
            <Card className="mb-3" style={{ maxWidth: '840px' }}>
                <Row className="g-0">
                    <Col md={8}>
                        <img src={movie.imagepath} className="img-fluid rounded-start" alt={movie.title} />
                    </Col>
                    <Col md={4}>
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.genre.Name}</Card.Text>
                            <Card.Text>{movie.description}</Card.Text>
                            <Card.Text>{movie.director.Name}</Card.Text>
                            {/* Optional: Uncomment if favorites feature is implemented */}
                            {/* <Button variant="primary">{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Button> */}
                            <Link to="/" className="btn btn-secondary">
                                Back
                            </Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
