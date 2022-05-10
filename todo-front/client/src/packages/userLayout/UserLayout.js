import React, { useContext } from "react";
import "./UserLayoutStyle.css";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import {
  SET_ADMIN_PANEL,
  SET_USER,
} from "../../modules/user/store/actionTypes/UserActionTypes";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserLayout = ({ children, props }) => {
  const [{ user, isAdminPanel }, dispatch] = useContext(UserContext);
  const history = useHistory();

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
  const redirectPage = (url) => {
    history.push(url);
  };

  return (
    <div className="user_layout">
      <div className="user_layout_sidebar">
        {user.username && user.role === "ADMIN" && isAdminPanel === true ? (
          <>
            <div className="user_recipes_holder">
              <h3>Рецепти</h3>
              <Link to={"/my_profile/recipes"} className="user_sidebar_option">
                Моите рецепти
              </Link>
              <Link
                className="user_sidebar_option"
                to={"/my_profile/recipe/create"}
              >
                Създай рецепта
              </Link>
            </div>
            <div className="user_recipes_holder">
              <h3>Категории</h3>{" "}
              <Link to="/my_profile/categories" className="user_sidebar_option">
                Моите категории
              </Link>
              <Link
                className="user_sidebar_option"
                to={"/my_profile/category/create"}
              >
                Създай категория
              </Link>
            </div>
            <div className="user_recipes_holder">
              <h3>Абонаменти</h3>{" "}
              <Link to="/my_profile/emails" className="user_sidebar_option">
                Имейли
              </Link>
            </div>
            <div className="user_recipes_holder">
              <h3>Контакти</h3>{" "}
              <Link to="/my_profile/contacts" className="user_sidebar_option">
                Контакти
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3>Навигация</h3>
            <Link to={"/my_profile"} className="user_sidebar_option">
              Моят профил
            </Link>
            <div className="user_sidebar_option" onClick={() => setUser({})}>
              Изход
            </div>
          </>
        )}
      </div>

      <div className="user_content_layout">
        {user.username && user.role === "ADMIN" && isAdminPanel === true && (
          <div
            onClick={() => {
              goToAdminPanel(false);
              redirectPage("/my_profile");
            }}
            className="user_go_to_my_profile_btn"
          >
            <FontAwesomeIcon icon={faArrowLeft}/>
            Към Моят профил
          </div>
        )}
        {children}
        {user.username &&
          user.role === "ADMIN" &&
          window.location.pathname === "/my_profile" && (
            <div
              onClick={() => {
                goToAdminPanel(true);
                redirectPage("/my_profile/recipes");
              }}
              className="user_sidebar_admin_btn"
            >
              Към администрацията
            </div>
          )}
      </div>
    </div>
  );
};

export default UserLayout;
