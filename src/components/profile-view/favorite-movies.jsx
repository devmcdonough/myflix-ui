import React, { useState } from "react";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss'


export const FavoriteMovies = ({ user, favoriteMovies }) => {
 
    return ( 
            <Row>
             <Col md={8} >
                 <h3>My Movies</h3>
             </Col>
             <Row>
                 {favoriteMovies.map((movie) => {
                   return (
                     <Col  className="mb-5" key={movie.id} md={4}>
                       <Link to={`/movies/${movie.title}`} />
                       <MovieCard
                         movie={movie}
                         isFavorite={user.favoriteMovies.includes(movie.title)}
                       />
                     </Col>
                   );
                 })}
               </Row>
            </Row>
            
           )
         }