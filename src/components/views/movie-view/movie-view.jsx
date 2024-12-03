import { useParams } from "react-router";
import React from "react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../../shared/favorite-button/favorite-button";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);
    if (!movies) return <div>Movie not found</div>;

    return (
        <div className="movie-view-container">
            <Link to="/" className="back-button">← Back</Link>
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-details">
                <div className="movie-text">
                    <p><span className="label">Genre:</span> <span className="value">{movie.genre.Name}</span></p>
                    <p><span className="label">Director:</span> <span className="value">{movie.director.Name}</span></p>
                    <p className="description">{movie.description}</p>
                    <FavoriteButton movie={movie} user={user} setUser={setUser} token={token} />
                </div>
                <div className="movie-image-container">
                    <img src={movie.imagepath} alt={movie.title} className="movie-image" />
                </div>
            </div>
        </div>
    );
};
