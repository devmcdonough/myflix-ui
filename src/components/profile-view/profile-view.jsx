import { useEffect, useState } from "react";
import { UserInfo } from './user-info'
import { Button, Card, Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FavoriteMoviesComponent, { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from "./update-user";

export const ProfileView = ({localUser, movies, token}) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const [username, setUsername]= useState(storedUser.username || "");
    const [email, setEmail] = useState(storedUser.email || "");
    const [password, setPassword]= useState(storedUser.password || "");
    const [birthday, setBirthday] = useState(storedUser.birthday || "");
    const [user, setUser]= useState({ FavoriteMovies: [] });
    const FavoriteMovies = user && Array.isArray(user.FavoriteMovies)
  ? movies.filter((m) => user.FavoriteMovies.includes(m.title))
  : [];

    const userData = {
        Username: username,
        Email: email,
        Birthday: birthday,
        Password: password,
        FavoriteMovies: user.FavoriteMovies
      };

      const favoriteMoviesList = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

    useEffect(() => {
        // Fetch user data and update state
    }, [token, setUser]);

      const handleSubmit = (event) => {
        event.preventDefault(event);
        fetch(`https://mymovielibrary-905482f59fde.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body:JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}` }
            }
          )
           .then((response) => {
            if (response.ok) {
                alert("Update successful");
                window.location.reload();

                return response.json()
            }
             alert("Update failed");
            })
            .then((user) => {
              if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user)
              }    
            })
            .catch((error) => {
              console.error(error);
            });
      };

      const handleUpdate = (e) => {
        switch(e.target.type) {
            case "text":
              setUsername(e.target.value);
              break;
            case "email":
              setEmail(e.target.value);
              break;
            case "password":
              setPassword(e.target.value);
              break;
            case "date":
              setBirthday(e.target.value);
              default:
          }
      }

      const handleDeregister = () => {
        fetch (`https://mymovielibrary-905482f59fde.herokuapp.com/users/${storedUser.Username}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
          }
      }).then ((response) => {
        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.clear();
          window.location.reload();
        } else {
          alert("Something went wrong.");
          }
        });
      };

    useEffect(() => {
        if (!token) {
          return;
        }
    
        fetch(`https://mymovielibrary-905482f59fde.herokuapp.com/users/${storedUser.Username}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Current user data", data);
           setUser(data);
        })
        .catch(error => console.error(error))
    }, [token]);

  return (
    <Container className="mx-1">
    <Row>
        <Card className="mb-5">
            <Card.Body>
                <Card.Title>My Profile  </Card.Title>
                        {
                            user && (<UserInfo name ={userData.Username} email={userData.email} />)
                        }
            </Card.Body>            
        </Card>
        <Card className="mb-5"> 
        <Card.Body>
          <UpdateUser 
           userData={userData}
           handleUpdate={handleUpdate}
           handleSubmit={handleSubmit}
           handleDeregister={handleDeregister}
           />
           </Card.Body>
           </Card>      
    </Row>
    <FavoriteMoviesComponent user={user} FavoriteMovies={favoriteMoviesList} />

      </Container>
  )
}

export default ProfileView;
