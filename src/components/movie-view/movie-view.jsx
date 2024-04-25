import { useParams } from "react-router";
import React from 'react';
import { Link } from "react-router-dom";
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';
import { FavoriteButton } from "../favorite-button/favorite-button";

export const MovieView = ({ movies, user, setUser, token }) => {

    const { movieId } = useParams();

        const movie = movies.find((m) => m.id === movieId);

        if (!movie) return <div>Movie not found</div>

    return (

        <div className="container mt-4">
            <Card className="mb-3" style={{ maxWidth: '640px' }}>
                <Row className="g-0">
                    <Col md={8}>
                        <img src={movie.imagepath} className="img-fluid rounded-start" alt={movie.title} />
                    </Col>
                    <Col md={4}>
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>Dir: {movie.director.Name}</Card.Text>
                            <Card.Text>{movie.genre.Name}</Card.Text>
                            <Card.Text>{movie.description}</Card.Text>
                            <FavoriteButton movie={movie} user={user} setUser={setUser} token={token} />
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
