import React, { useEffect, useState } from "react";
import "./FooterStyle.css";
import OrangeButton from "../../buttons/orangeButton/OrangeButton";
import { Link } from "react-router-dom";
import axios from "axios";
import isValidEmail from "./../../../utils/EmailValidator";

const Footer = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/category/`)
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const validateForm = () => {
    let isValid = true;

    if (email.length < 1 || !isValidEmail(email)) {
      isValid = false;
      setEmailError("Моля, попълнете валиден имейл.");
    }

    return isValid;
  };
  const resetForm = () => {
    setEmailError("");
    setEmail("");
  };
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      setEmailError("Моля, попълнете валиден имейл.");
      return;
    }
    setEmailError("");

    let newsletter = {
      email: email,
    };
    axios
      .post(`http://localhost:4000/emails`, { newsletter })
      .then((res) => {
        resetForm();
        setSuccess("Вие се абонирахте успешно!");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="newsletter">
          <h2>Абонирайте се за повече интересни рецепти!</h2>
          <div className="email_wrapper">
            <input
              type="text"
              name={"email"}
              value={email}
              placeholder={"Въведете вашия имейл"}
              onChange={handleChange}
            />
            <OrangeButton onClick={handleSubmit} text={"Изпрати"} />
          </div>
          {emailError && <p className="error">{emailError}</p>}
          {success && <p className="success">{success}</p>}
        </div>
        <div className="main_footer_content">
          <div className="row">
            <div className="col-3">
              <img src="/logo.svg" alt="logo" />
            </div>
            <div className="col-3">
              <h3>За CookingDiary</h3>
              <Link to={"/"}>Начало</Link>
              <Link to={"/about-us"}>За нас</Link>
            </div>
            <div className="col-3">
              <h3>Рецепти</h3>
              {isLoading ? null : (
                <>
                  {categories.map((category, index) => {
                    return (
                      <Link key={index} to={`/категория/${category.name}`}>
                        {category.name}
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
            <div className="col-3">
              <h3>Контакти</h3>
              <a href={"mailto:cookingdiary@gmail.com"}>
                cookingdiary@gmail.com
              </a>
              <a href={"tel:0889765472"}>0889765472</a>
            </div>
          </div>
          <div className="rights_reserved">2021 @All rights reserved</div>
        </div>
      </div>
      <img
        src="/footer-background.png"
        alt="footer"
        className="footer_background"
      />
    </footer>
  );
};

export default Footer;
