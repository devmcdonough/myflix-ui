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

        <Card>
            <Card.Img variant="top" src={movie.imagepath} />
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{movie.title}</Card.Title>
                    </Col>
                </Row>
                <Card.Text>{movie.genre.Name}</Card.Text>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Text>{movie.director.Name}</Card.Text>
                {/* {isFavorite ? (
                    <Button variant="primary" onClick={handleRemoveFromFavorites}>
                        Remove from Favorites
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleAddToFavorites}>
                        Add to Favorites
                    </Button>
                )} */}
            </Card.Body>
            <Link to={`/`} className="btn btn-secondary">
                Back
            </Link>
        </Card>
    );
};