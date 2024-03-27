import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {

    const handleFavoriteClick = () => {
        onToggleFavorite(movie._id);
    };


    return (
       <Card>
        <Card.Img variant="top" src={movie.imagepath} />
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director.Name}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">
                Open 
                </Button>
            </Link>
            <Button variant="primary" onClick={handleFavoriteClick}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
        </Card.Body>
       </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({ 
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        director: PropTypes.object.isRequired,
        imagepath: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
    onToggleFavorite: PropTypes.func,
    isFavorite: PropTypes.bool,
};