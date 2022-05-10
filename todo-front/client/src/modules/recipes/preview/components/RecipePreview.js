import React, { useContext } from "react";
import "./RecipePreviewStyle.css";
import UserContext from "../../../../utils/UserContext";
import OrangeButton from "../../../../packages/buttons/orangeButton/OrangeButton";
import moment from "moment";
import {
  faBookmark,
  faClock,
  faExclamation,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecipePreview = ({
  recipe,
  handleInput,
  comments,
  postComment,
  commentDescr,
  categoryName,
}) => {
  const [{ user }] = useContext(UserContext);
  return (
    <div style={{ position: "relative" }} className="page_wrapper">
      <div className="recipe_header_wrapper" />
      <div className="recipe_header">
        <div className="recipe_preview_image_holder">
          <img src={recipe.image} alt={"recipe"} />
        </div>
        <div className="recipe_preview_title_holder">
          <div className="recipe_preview_date">
            {moment.unix(recipe.Date).format("DD.MM.YYYY")}
          </div>
          <h1>{recipe.title}</h1>
          <div className="author">
            <img src={"/author.jpg"} alt="author" />
            <h3>Marina Penkova</h3>
          </div>
        </div>
      </div>{" "}
      {user.username ? (
        <div className="recipe_preview">
          <div className="recipe_preview_more_info">
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faClock} />
              <div className={"recipe_preview_item_title"}>Време</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {recipe.cooking_time}</div>
            </div>
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faExclamation} />
              <div className={"recipe_preview_item_title"}>Трудност</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {recipe.level_of_difficulty}</div>
            </div>{" "}
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faUtensils} />
              <div className={"recipe_preview_item_title"}>Ястие</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {recipe.title}</div>
            </div>
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faBookmark} />
              <div className={"recipe_preview_item_title"}>Категория</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {categoryName}</div>
            </div>
          </div>
          <div
            className="editor_container"
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
          <h2 className="comments_title ">
            Какво казват хората за тази рецепта
          </h2>
          {comments.map((comment, index) => {
            return (
              <div key={index} className="comment_holder">
                {" "}
                <div className={"user_initials_wrapper"}>
                  <div className="user_initials">
                    {comment.username.charAt(0)}
                  </div>
                  <div className="recipe_username"> {comment.username}</div>
                </div>
                <div className="comment">{comment.comment}</div>{" "}
              </div>
            );
          })}
          <div className="recipe_textarea">
            <div className="user_initials">{user.username.charAt(0)}</div>

            <div className="recipe_textarea_holder">
              <textarea
                placeholder={"Напишете своя коментар..."}
                className="recipe_comment_textarea"
                onChange={handleInput}
                cols={10}
                rows={4}
                name="comment"
                value={commentDescr}
              />
              <div style={{ marginTop: 20 }}>
                <OrangeButton text={"Публикувай"} onClick={postComment} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="unloged_preview">
          <div className="recipe_preview_more_info">
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faClock} />
              <div className={"recipe_preview_item_title"}>Време</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {recipe.cooking_time}</div>
            </div>
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faExclamation} />
              <div className={"recipe_preview_item_title"}>Трудност</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {recipe.level_of_difficulty}</div>
            </div>{" "}
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faUtensils} />
              <div className={"recipe_preview_item_title"}>Ястие</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {recipe.title}</div>
            </div>
            <div className="recipe_preview_item">
              <FontAwesomeIcon icon={faBookmark} />
              <div className={"recipe_preview_item_title"}>Категория</div>
              <div className="divider" />
              <div style={{ height: 30 }}> {categoryName}</div>
            </div>
          </div>

          <div
            className="editor_container"
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
          <div className="layout" />
          <div style={{ marginTop: 30 }}>
            <OrangeButton text={"Вход"} linkTo={"/login"} />
          </div>
          <h2 className="comments_title ">
            Какво казват хората за тази рецепта
          </h2>
          {comments.map((comment, index2) => {
            return (
              <div key={index2} className="comment_holder">
                {" "}
                <div className={"user_initials_wrapper"}>
                  <div className="user_initials">
                    {comment.username.charAt(0)}
                  </div>
                  <div className="recipe_username"> {comment.username}</div>
                </div>
                <div className="comment">
                  {comment.comment}
                </div>{" "}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipePreview;
