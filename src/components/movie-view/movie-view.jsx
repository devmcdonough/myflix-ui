import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"
import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

        const movie = movies.find((m) => m.id === movieId);

        if (!movie) return <div>Movie not found</div>

    return (
     <div>
        <div>
            <img className="w-100" src={movie.imagepath} />
        </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.Name}</span>
            </div>
            <Link to={`/`}>
            <button className="back-button">
                Back
            </button>
            </Link>
        </div>
    );
};