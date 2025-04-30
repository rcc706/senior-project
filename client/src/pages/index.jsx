import React from "react";
import { createRoot } from "react-dom/client"; 
import App from '../components/App';

// this file is the script in the index.html file
// creating the root element and rendering the entire app 

const root = createRoot(document.getElementById("root"));

// rendering the app
root.render(
    <App />
);