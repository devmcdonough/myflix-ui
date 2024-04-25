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
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap/FormControl";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [searchBar, setSearchBar] = useState("");
    

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

  const handleSearchBarReset = () => {
    setSearchBar("");
  };

  const filteredMovies = movies.filter(
    (movie) =>
    searchBar.trim() === "" ||
    movie.title.toLowerCase().includes(searchBar.toLowerCase())
  );
  

return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={() => setUser(null)
    }
    searchBar={searchBar}
    setSearchBar={setSearchBar}
    handleSearchBarReset={handleSearchBarReset} 
    />
    <Row className="justify-content-md-center">
                <Routes>
                    <Route path="/login" element={
                        <Row>
                            <Col md={6}>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }} />
                            </Col>
                            <Col md={6}>
                                <SignUpView onLoggedIn={(user, token) => {
                                  setUser(user)
                                  setToken(token);
                                }} />
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
                    {filteredMovies.map((movie) => (
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
                      setMovies={setMovies}
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
