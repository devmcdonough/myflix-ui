import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import './movie-card.scss';

export const MovieCard = ({ movie, user, setUser, token }) => {
    // Determine if the movie is a favorite based on the user's favorite movies list
    const [localIsFavorite, setLocalIsFavorite] = useState(user?.FavoriteMovies.includes(movie.id));

    // Effect to update localIsFavorite when user's favorite movies change
    useEffect(() => {
        setLocalIsFavorite(user?.FavoriteMovies.includes(movie.id));
    }, [user, movie.id]);

    const toggleFavorite = async () => {
        const method = localIsFavorite ? "DELETE" : "POST";
        setLocalIsFavorite(!localIsFavorite); // Optimistically toggle the favorite status

        try {
            const response = await fetch(`https://mymovielibrary-905482f59fde.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error(`Failed to ${localIsFavorite ? "remove from" : "add to"} favorites`);

            const updatedUser = await response.json();
            setUser(updatedUser);  // Update global user state
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
            setLocalIsFavorite(!localIsFavorite);  // Revert optimistic update on error
            console.error("Failed to update favorites:", error);
        }
    };

    return (
        <Card>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`} className='title-text' >
            <Card.Img variant="top" src={movie.imagepath} />
            </Link>
            <Card.Body>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`} >
                <Card.Title className="title-text">{movie.title}</Card.Title>
                </Link>
                <Card.Text>{movie.director.Name}</Card.Text>
                <Button 
                variant="outline-danger"
                 onClick={toggleFavorite}
                 className="favorite-button">
                    {localIsFavorite ? <BsHeartFill className='Heart' /> : <BsHeart />}
                    {localIsFavorite ? " Remove from Favorites" : " Add to Favorites"}
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
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};
