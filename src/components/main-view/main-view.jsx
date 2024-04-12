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
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    

    useEffect(() => {
      if (!token) {
          return;
      }
      console.log("Token used for request:", token); // Confirm the token is correct

      fetch("https://mymovielibrary-905482f59fde.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        console.log("Response Status:", response.status); // Log the response status
        console.log("Response Headers:", response.headers); // Optionally log headers for more insight

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then((data) => {
        console.log("Data received:", data); // See what data is actually returned
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
          console.log("Fetching from URL:", "https://mymovielibrary-905482f59fde.herokuapp.com/movies");
      }).catch(error => console.error("Fetching error:", error));
  }, [token]);
  

return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={() => setUser(null)} />
    <Row className="justify-content-md-center">
                <Routes>
                    <Route path="/login-signup" element={
                        <Row>
                            <Col md={6}>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }} />
                            </Col>
                            <Col md={6}>
                                <SignUpView />
                            </Col>
                        </Row>
                    } />
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
                        isFavorite={user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)}  />
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
                      user={user}
                      movies={movies}
                      token={token}
                      setUser={setUser}
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
