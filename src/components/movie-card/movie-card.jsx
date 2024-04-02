import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const MovieCard = ({ movie, isFavorite, user, setUser, token }) => {

    const [addTitle, setAddTitle] = useState("");
    const [removeTitle, setRemoveTitle] = useState("");


    // useEffect(() => {
    //     if (!user || !token) {
    //         return;
    //     }   
    //             }, [addTitle, removeTitle, token]);

    const addToFavorites = () => {
        console.log("Before adding to favorites:", { isFavorite, FavoriteMovies: user.FavoriteMovies });

        const username = user.username;
        console.log('User in MovieCard:', user);

        fetch(
            `https://mymovielibrary-905482f59fde.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error("Failed to add to favorites");
                }
                alert("Movie added to favorites!");
                setAddTitle("");
                return response.json();
            })
            .then((updatedUser) => {
                console.log(updatedUser);
                if (updatedUser) {
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    console.log("After adding to favorites:", { isFavorite, FavoriteMovies: user.FavoriteMovies });

                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    const removeFromFavorites = () => {
        fetch(
            `https://mymovielibrary-905482f59fde.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error("Could not remove movie");
                }
                alert("Movie removed from favorites");
                setRemoveTitle("");
                return response.json();
            })
            .then((updatedUser) => {
                if (updatedUser) {
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    setUser(updatedUser);
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

    const handleAddToFavorites = () => {
        console.log(`Adding ${movie.id} to favorites`)
        setAddTitle(movie.id);
    };

    const handleRemoveFromFavorites = () => {
        console.log(`Removing ${movie.id} from favorites`)
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
                    <Button variant="primary" onClick={removeFromFavorites}>
                        Remove from Favorites
                    </Button>
                ) : (
                    <Button variant="primary" onClick={addToFavorites}>
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
    isFavorite: PropTypes.bool,
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired,
};