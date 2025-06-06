import React from "react";
import ReactDOM from "react-dom/client";  // note the "/client"
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import './style.css';


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!); // the ! asserts it’s not null

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
