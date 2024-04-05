import React, { useState } from "react";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss'
import { MovieCard } from "../movie-card/movie-card";


export const FavoriteMoviesComponent = ({ user, FavoriteMovies }) => {
  console.log(user.FavoriteMovies);
 
    return ( 
            <Row>
             <Col md={8} >
                 <h3>My Movies</h3>
             </Col>
             <Row>
                 {FavoriteMovies.map((movie) => {
                   console.log(FavoriteMovies);
                   return (
                     <Col  className="mb-5" key={movie.id} md={4}>
                       <Link to={`/movies/${movie.id}`}>Open</Link>
                       <MovieCard
                       />
                     </Col>
                   );
                 })}
               </Row>
            </Row>
            
           )
         }

  export default FavoriteMoviesComponent;