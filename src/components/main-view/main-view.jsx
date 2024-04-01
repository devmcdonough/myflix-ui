import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken && !token) {
        setToken(storedToken); // Set token state if not already set
      }
    }, [token]);

    useEffect(() => {
      if (!token) {
          return;
      }
      fetch("https://mymovielibrary-905482f59fde.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}`},
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then((data) => {
          console.log(data);
          const moviesFromApi = data.map((movie) => {
              return { 
                  id: movie._id,
                  title: movie.Title,
                  genre: {
                     Name: movie.Genre.Name,
                     Description: movie.Genre.Description
                  },
                  description: movie.Description,
                  director: {
                    Name: movie.Director.Name,
                    Bio: movie.Director.Bio
              },
                  imagepath: movie.ImagePath
          }});
          setMovies(moviesFromApi);
      }).catch(error => console.error("Fetching error:", error));
  }, [token]);
  

return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={() => setUser(null)} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignUpView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard 
                        movie={movie} 
                        user={user} 
                        setUser={setUser} 
                        token={token}
                        isFavorite={user && user.FavoriteMovies.includes(movie.id)}  />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      localUser={user}
                      movies={movies}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
          }
