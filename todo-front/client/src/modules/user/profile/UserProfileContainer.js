import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../utils/UserContext";
import axios from "axios";
import UserProfile from "./components/UserProfile";
import { SET_USER } from "../store/actionTypes/UserActionTypes";

const UserProfileContainer = (props) => {
  const [{ user }, dispatch] = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [inputState, setInputState] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    getUser();
  }, []);
  const handleInput = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const getUser = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/user/${user.id}`)
      .then((res) => {
        setInputState({
          username: res.data[0].username,
          password: res.data[0].password,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleSubmit = () => {
    let data = {
      username: inputState.username,
      password: inputState.password,
    };
    axios.put(`http://localhost:4000/user/${user.id}`, { data }).then((res) => {
      setUser({ ...user, username: data.username, password: data.password });
      setSuccess("Вие променихте данните си успешно!");
    });
  };

  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };

  if (isLoading) return null;
  return (
    <UserProfile
      handleInput={handleInput}
      success={success}
      handleSubmit={handleSubmit}
      inputState={inputState}
    />
  );
};

export default UserProfileContainer;
