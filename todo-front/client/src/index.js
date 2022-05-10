import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./packages/common.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { UserProvider } from "./utils/UserContext";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

class App extends React.Component {
  render() {
    const firebaseConfig = {
      apiKey: "AIzaSyCRafQGcJNVbPONqct5uuNooj6XYxhWpxQ",
      authDomain: "cookingdiary-a39d8.firebaseapp.com",
      projectId: "cookingdiary-a39d8",
      storageBucket: "cookingdiary-a39d8.appspot.com",
      messagingSenderId: "689295795268",
      appId: "1:689295795268:web:ef977a9b98a23341f88811",
      measurementId: "G-LC2L7CYS3F",
    };
    initializeApp(firebaseConfig);
    return (
      <UserProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UserProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
