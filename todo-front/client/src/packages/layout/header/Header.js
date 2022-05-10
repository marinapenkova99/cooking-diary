import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import {
  SET_ADMIN_PANEL,
  SET_USER,
} from "../../../modules/user/store/actionTypes/UserActionTypes";
import axios from "axios";

const Header = (props) => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollPosition, setScrollTop] = useState(0);
  const [{ user }, dispatch] = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollPosition);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolling, user]);

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
  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };
  const goToAdminPanel = (isAdminPanel) => {
    dispatch({
      type: SET_ADMIN_PANEL,
      payload: { isAdminPanel: isAdminPanel },
    });
  };
  return (
    <header className={scrollPosition > 120 ? "scrolled_header" : "header"}>
      <div className="header_content">
        <Link to="/" className="logo_holder">
          <img src={"/logo.svg"} alt="logo" />
        </Link>
        <div className="header_nav_menu">
          <NavLink
            exact
            className="nav_link"
            to={"/"}
            activeClassName={"active_link"}
          >
            Начало
          </NavLink>
          <div className="recipes_wrapper">
            <NavLink
              exact
              className="nav_link"
              activeClassName={"active_link"}
              to={"/recipes"}
            >
              Рецепти <FontAwesomeIcon icon={faAngleDown} />
            </NavLink>
            <div className="recipes_dropdown">
              {isLoading ? null : (
                <div className="recipes_dropdown_content">
                  {categories.map((category, index) => {
                    return (
                      <Link key={index} to={`/категория/${category.name}`}>
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <NavLink
            exact
            className="nav_link"
            activeClassName={"active_link"}
            to={"/about-us"}
          >
            За нас
          </NavLink>
          <NavLink
            exact
            className="nav_link"
            activeClassName={"active_link"}
            to={"/contacts"}
          >
            Контакти
          </NavLink>
          {user.username ? (
            <div className="user_header_box">
              {" "}
              <div className="user">
                <FontAwesomeIcon icon={faUserAlt} /> {user.username}
              </div>
              <div className="user_dropdown">
                <div
                  className={
                    scrollPosition < 120 && window.location.pathname === "/"
                      ? "user_white_dropdown_content"
                      : "user_dropdown_content"
                  }
                >
                  <Link
                    onClick={() => goToAdminPanel(false)}
                    to={"/my_profile"}
                    className={"user_dropdown_option"}
                  >
                    Към профила
                  </Link>
                  <Link
                    to={"/"}
                    onClick={() => {
                      setUser({});
                      goToAdminPanel(false);
                    }}
                    className={"user_dropdown_option"}
                  >
                    Изход
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              className={
                scrollPosition > 120 && window.location.pathname === "/"
                  ? "orange_login_btn"
                  : window.location.pathname !== "/"
                  ? "orange_login_btn"
                  : "login_btn"
              }
            >
              Вход
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
