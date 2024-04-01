import React, { useState } from "react";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss'
import { MovieCard } from "../movie-card/movie-card";


export const FavoriteMovies = ({ user, favoriteMovies }) => {
 
    return ( 
            <Row>
             <Col md={8} >
                 <h3>My Movies</h3>
             </Col>
             <Row>
                 {favoriteMovies.map((movie) => {
                  const isFavorite = user && Array.isArray(user.favoriteMovies) && user.favoriteMovies.includes(movie.id);

                   return (
                     <Col  className="mb-5" key={movie.id} md={4}>
                       <Link to={`/movies/${movie.id}`} />
                       <MovieCard
                         movie={movie}
                         isFavorite={isFavorite}
                       />
                     </Col>
                   );
                 })}
               </Row>
            </Row>
            
           )
         }