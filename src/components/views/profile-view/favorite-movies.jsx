import React, { useState } from "react";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../../shared/movie-card/movie-card";
import { useEffect } from "react";


export const FavoriteMovies = ({ user, favoriteMovies, token, setUser, isFavorite }) => {
  useEffect(() => {
}, [favoriteMovies]);

    return ( 
            <Row>
             <Col>
                 <h3>My Movies</h3>
             </Col>
             <Row>
                 {favoriteMovies.map((movie) => {

                   return (
                     <Col  className="mb-5" key={movie.id} md={4}>
                       <MovieCard 
                       movie={movie}
                       user={user}
                       token={token}
                       setUser={setUser}
                       isFavorite={isFavorite}

                       />
                     </Col>
                   );
                 })}
               </Row>
            </Row>
            
           )
         }

  export default FavoriteMovies;