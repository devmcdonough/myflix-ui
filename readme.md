# myFlix React App

## Objective
To build the client-side for an app called myFlix using React, based on its existing server-side code (REST API and database).

## Context
Client-side development has become crucial in modern web applications. Unlike traditional server-side rendered pages, modern applications use libraries like React to create dynamic and responsive user interfaces. This project will showcase your ability to build a complete web application using full-stack JavaScript technologies, specifically the MERN (MongoDB, Express, React, and Node.js) stack.

## User Stories
- As a user, I want to be able to access information about movies so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Features & Requirements

### Essential Views & Features

### Main view
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

### Single Movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

### Login view
- Allows users to log in with a username and password

### Signup view
- Allows new users to register (username, password, email, date of birth)

### Profile view
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Optional Views & Features

### Actors view
- Allows users to view information about different actors

### Genre view
- Returns data about a genre, with a name and description
- Displays example movies

### Director view
- Returns data about a director (name, bio, birth year, death year)
- Displays example movies from the director
- Single Movie view (optional features)
- Allow users to see which actors star in which movies
- Allow users to view more information about different movies, such as the release date and movie rating
- Allow users to access different movie information, such as genre description and director bio, without leaving the view (e.g., tooltips)
- Allow users to share a movie
- Display a list of related or similar movies

### Main view (optional features)
- Allow users to sort movies based on different criteria
- Profile, Single Movie, and Main views (optional features)
- Allow users to create a “To Watch” list in addition to their “Favorite Movies” list

## Technical Requirements
- The application must be a single-page application (SPA)
- The application must use state routing to navigate between views and share URLs
- The application must give users the option to filter movies using a “search” feature
- The application must use Parcel as its build tool
- The application must be written using the React library and in ES2015+
- The application must use Bootstrap as a UI library for styling and responsiveness
- The application must contain function components
- The application must be hosted online
- The application may use React Redux for state management of at least one feature (i.e., filtering movies)

## Installation
1. **Clone the repository**: git clone https://github.com/devmcdonough/myflix-ui
2. **Navigate to the project directory**: cd myflix-client
3. **Install dependencies**:
"bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "lodash": "^4.17.21",
    "mongoose": "^8.1.3",
    "morgan": "^1.10.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "uuid": "^9.0.1"

4. **Start the development server**: npm start

Usage
Once the application is running, you can navigate through different views, search for movies, and manage your profile. Detailed instructions and examples will be provided in the app.

## Contributing
1. **Fork the repository**
2. **Create a new branch**:
git checkout -b feature/new-feature
3. **Make your changes and commit them**:
git commit -m "Add new feature"
4. **Push to the branch**:
git push origin feature/new-feature
5. **Create a pull request**

## License
This project is licensed under the MIT License

## Acknowledgements
Node.js
Express
MongoDB
Mongoose
Passport
Heroku# 