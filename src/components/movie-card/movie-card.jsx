import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const MovieCard = ({ movie, isFavorite }) => {

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [addTitle, setAddTitle] = useState("");
    const [removeTitle, setRemoveTitle] = useState("");

    useEffect(() => {
        if (!user || !token) {
            return;
        }    

        const addToFavorites = () => {
            fetch(
                `https://mymovielibrary-905482f59fde.herokuapp.com/users/${user.username}/movies/${encodeURIComponent(movie.id)}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    if(!response.ok) {
                        throw Error("Failed to add to favorites");
                    }
                alert("Movie added to favorites!");
                setAddTitle("");
                return response.json();
                })
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            }

        const removeFromFavorites = () => {
            fetch(
                `https://mymovielibrary-905482f59fde.herokuapp.com/users/${user.username}/movies/${encodeURIComponent(movie.id)}`,
                {
                    method: "DELETE",
                    headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    }
                }
            )
                .then((response) => {
                    if(!response.ok) {
                        throw Error("Could not remove movie");
                    }
                    alert("Movie removed from favorites");
                    setRemoveTitle("");
                    return response.json();
                    })
                    .then((user) => {
                        if (user) {
                            localStorage.setItem("user", JSON.stringify(user));
                            setUser(user);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                    };
                    if (addTitle) {
                        addToFavorites();
                    }
                    if (removeTitle) {
                        removeFromFavorites();
                    }
                }, [addTitle, removeTitle, token]);

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
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director.Name}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">
                Open 
                </Button>
            </Link>
            {isFavorite ? (
            <Button variant="primary" onClick={handleRemoveFromFavorites}>
            Remove from Favorites
        </Button>
            ) : (
            <Button variant="primary" onClick={handleAddToFavorites}>
            Add to Favorites
        </Button>
)}
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