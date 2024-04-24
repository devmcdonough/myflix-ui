import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";


// Import statemtn to indicate that you need to bundle './index.scss'
import { MainView } from './components/main-view/main-view';
import { Container } from 'react-bootstrap';

import "./index.scss";

// Main component
const MyFlixApplication = () => {
    return (
        <Container>
       <MainView />
       </Container>
    );
};

//Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render your app in the root DOM element
root.render(
<MyFlixApplication />
);