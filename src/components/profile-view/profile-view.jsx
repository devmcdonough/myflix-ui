import { useEffect, useState } from "react";
import { UserInfo } from './user-info'
import { Button, Card, Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from "./update-user";

export const ProfileView = ({localUser, movies, token}) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const [username, setUsername]= useState(storedUser.username || "");
    const [email, setEmail] = useState(storedUser.email || "");
    const [password, setPassword]= useState(storedUser.password || "");
    const [birthday, setBirthday] = useState(storedUser.birthday || "");
    const [user, setUser]= useState();
    const favoriteMovies = user === undefined || user.favoriteMovies === undefined
    ? [] 
    : movies.filter(m => user.favoriteMovies.includes(m.title))

    const userData = {
        username: username,
        email: email,
        birthday: birthday,
        password: password
      };
      const handleSubmit = (event) => {
        event.preventDefault(event);
        fetch(`https://mymovielibrary-905482f59fde.herokuapp.com/users/${user.username}`, {
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
        fetch (`https://mymovielibrary-905482f59fde.herokuapp.com/users/${storedUser.username}`, {
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
    
        fetch("https://mymovielibrary-905482f59fde.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Users data: ", data);
            const usersFromApi = data.map((resultUser) => {
            return {
              id: resultUser._id,
              username: resultUser.username,
              password: resultUser.password,
              email: resultUser.email,
              birthday: resultUser.birthday,
              favoriteMovies: resultUser.favoriteMovies
            };
          });
          const foundUser = usersFromApi.find((u) => u.username === localUser.username);
          setUser(foundUser);
          console.log("Profile Saved User: ", foundUser);
        })
        .catch((error) => {
            console.error(error);
          });
    }, [token]);

  return (
    <Container className="mx-1">
    <Row>
        <Card className="mb-5">
            <Card.Body>
                <Card.Title>My Profile  </Card.Title>
                    <Card.Text>
                        {
                            user && (<UserInfo name ={userData.username} email={userData.email} />)
                        }
                    </Card.Text>              
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
    <Row>
        <Col className="mb-5" xs={12} md={12}>
            {
                favoriteMovies && (<FavoriteMovies user={user} favoriteMovies={favoriteMovies} />)
            }
        </Col>
      </Row>
      </Container>
  )
}

export default ProfileView;
