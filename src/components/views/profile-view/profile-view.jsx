import { useEffect, useState } from "react";
import { UserInfo } from './user-info'
import { Card, Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import FavoriteMovies from './favorite-movies';
import { UpdateUser } from "./update-user";

export const ProfileView = ({ movies, token, user, setUser }) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const [username, setUsername]= useState(storedUser.Username || "");
    const [email, setEmail] = useState(storedUser.Email || "");
    const [password, setPassword]= useState(storedUser.password || "");
    const [birthday, setBirthday] = useState(storedUser.birthday || "");
    const favoriteMovies = user && Array.isArray(user.FavoriteMovies)
  ? movies.filter((m) => user.FavoriteMovies.includes(m.id))
  : [];

    const userData = {
        Username: username,
        Email: email,
        Birthday: birthday,
        Password: password,
        FavoriteMovies: user.FavoriteMovies
      };

    useEffect(() => {
      if (!token || !storedUser.Username) {
        return; // Prevents running the fetch if the token or username isn't available
    }

    // Define the URL with the stored username to fetch the user details
    const url = `https://mymovielibrary-905482f59fde.herokuapp.com/users/${storedUser.Username}`;

    fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        setUser(data); // Update the user in the global state
        console.log(data);  // Check the structure and content of fetched data
        setUsername(data.Username || "");  // Update local username state
        setEmail(data.Email || "");        // Update local email state
        setPassword(data.Password || "");  // Update local password state
        const formattedBirthday = data.Birthday ? new Date(data.Birthday).toISOString().split('T')[0] : '';
        setBirthday(formattedBirthday);
        })
    .catch(error => {
        console.error('Failed to fetch user:', error);
    });
}, [token, storedUser.Username, setUser]);

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
                            user && (<UserInfo name ={userData.Username} email={userData.Email} />)
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
    <FavoriteMovies user={user} setUser={setUser} favoriteMovies={favoriteMovies} token={token} />

      </Container>
  )
}

export default ProfileView;
