import React, { useState, useEffect } from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import './favorite-button.scss'

export const FavoriteButton = ({ user, token, movie, setUser }) => {

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
        <Button
            variant="outline-danger"
            onClick={toggleFavorite}
            className="favorite-button">
            {localIsFavorite ? <BsHeartFill className='heart' /> : <BsHeart className='heart' />}
            {localIsFavorite ? " Remove from Favorites" : " Add to Favorites"}
        </Button>
    )
}