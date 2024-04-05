import React, { useState } from "react";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss'
import { MovieCard } from "../movie-card/movie-card";
import { useEffect } from "react";


export const FavoriteMoviesComponent = ({ user, FavoriteMovies }) => {
  useEffect(() => {
    console.log("Favorite Movies have been updated", FavoriteMovies);
}, [FavoriteMovies]);

    return ( 
            <Row>
             <Col md={8} >
                 <h3>My Movies</h3>
             </Col>
             <Row>
                 {user.FavoriteMovies.filter((movie) => {
                   console.log(FavoriteMovies);
                   return (
                     <Col  className="mb-5" key={movie.id} md={4}>
                       <Link to={`/movies/${movie.id}`}>Open</Link>
                       <MovieCard 
                       movie={movie}
                       />
                     </Col>
                   );
                 })}
               </Row>
            </Row>
            
           )
         }

  export default FavoriteMoviesComponent;