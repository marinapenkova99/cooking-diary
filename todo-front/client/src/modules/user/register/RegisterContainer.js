import React, { useContext, useState } from "react";
import axios from "axios";
import RegisterForm from "./components/RegisterForm";
import { SET_USER } from "../store/actionTypes/UserActionTypes";
import { v4 as uuidv4 } from "uuid";
import UserContext from "../../../utils/UserContext";
import emailValidator from "../../../utils/EmailValidator";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const RegisterContainer = () => {
  const [id, setId] = useState(uuidv4());
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    secondPassword: "",
  });
  const [userInfoError, setUserInfoError] = useState({
    username: "",
    email: "",
    password: "",
    secondPassword: "",
  });
  const [{ user }, dispatch] = useContext(UserContext);
  const auth = getAuth();
  const validateForm = () => {
    let isValid = true;
    let usernameError = "";
    let passwordError = "";
    let emailError = "";
    if (userInfo.username.length <= 3 || userInfo.username.length >= 20) {
      isValid = false;
      usernameError = "Моля, въведете валидно потребителско име.";
    }
    if (!userInfo.email.length || !emailValidator(userInfo.email)) {
      isValid = false;
      emailError = "Моля, въведете валиден имейл.";
    }
    if (
      userInfo.password.length <= 1 ||
      userInfo.secondPassword !== userInfo.password
    ) {
      isValid = false;
      passwordError = "Моля, въведете парола.";
    }
    setUserInfoError({
      ...userInfoError,
      username: usernameError,
      password: passwordError,
      secondPassword: passwordError,
      email: emailError,
    });
    return isValid;
  };
  const resetForm = () => {
    setUserInfoError({
      username: "",
      password: "",
      secondPassword: "",
      email: "",
    });
  };
  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        let isRegisterFormValid = validateForm();

        if (!isRegisterFormValid) {
          return;
        }

        resetForm();
        let user = {
          username: userInfo.username,
          password: userInfo.password,
          email: userInfo.email,
          id: id,
          role: "USER",
        };
        axios
          .post(`http://localhost:4000/user/register`, { user })
          .then((res) => {
            Login();
            {console.log('second then')}
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Login = () => {
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
                console.log(err.response);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <RegisterForm
      username={userInfo.username}
      email={userInfo.email}
      emailError={userInfoError.email}
      password={userInfo.password}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      password2={userInfo.secondPassword}
      usernameError={userInfoError.username}
      passwordError={userInfoError.password}
    />
  );
};

export default RegisterContainer;
