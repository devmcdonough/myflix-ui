import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { createRoot } from 'react-dom/client';
import { store } from "./redux/store";
import { Provider } from 'react-redux';



// Import statemtn to indicate that you need to bundle './index.scss'
import { MainView } from './components/main-view/main-view';
import { Container } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { Provider } from 'react-redux';

// Main component
const MyFlixApplication = () => {
    return (
        <Provider store={store}>
        <Container>
       <MainView />
       </Container>
       </Provider>
    );
};

//Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render your app in the root DOM element
root.render(
<MyFlixApplication />
);