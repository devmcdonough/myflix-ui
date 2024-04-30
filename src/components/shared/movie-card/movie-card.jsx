import React from 'react';
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import { FavoriteButton } from '../favorite-button/favorite-button';

export const MovieCard = ({ movie, user, setUser, token }) => {

    return (
        <Card className='movie-card'>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`} className='title-text' >
            <Card.Img variant="top" src={movie.imagepath} />
            </Link>
            <Card.Body>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`} >
                <Card.Title className="title-text">{movie.title}</Card.Title>
                </Link>
                <Card.Text>{movie.director.Name}</Card.Text>
                <FavoriteButton movie={movie} user={user} setUser={setUser} token={token} />
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
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};
