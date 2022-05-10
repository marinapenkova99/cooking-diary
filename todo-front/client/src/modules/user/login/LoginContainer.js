import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import { SET_USER } from "../store/actionTypes/UserActionTypes";
import Context from "../../../utils/UserContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginContainer = (props) => {
  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
  });
  const [currentUser, setCurrentUser] = useState(undefined);
  const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(Context);
  const auth = getAuth();

  const handleSubmit = async () => {
    let user = {
      password: userInfo.password,
      email: userInfo.email,
    };
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        userCredential.user
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            const config = {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            };
            axios
              .post(`http://localhost:4000/user/login`, { user }, config)
              .then((res) => {
                // window.location.assign("/");
                setUser(res.data[0]);
              })
              .catch((err) => {
                setError(err.response.data.message);
                console.log(err.response);
              });
          })
          .catch((error) => {
            setError('Невалидни данни')
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
        setError('Невалидни данни')

      });
  };
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };
  {
    console.log("user", currentUser);
  }
  return (
    <LoginForm
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      password={userInfo.password}
      email={userInfo.email}
    />
  );
};

export default LoginContainer;
