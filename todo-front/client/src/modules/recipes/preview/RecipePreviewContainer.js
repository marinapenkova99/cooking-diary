import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import RecipePreview from "./components/RecipePreview";
import UserContext from "../../../utils/UserContext";

const RecipePreviewContainer = (props) => {
  const [{ user }] = useContext(UserContext);
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [commentDescr, setComment] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    getRecipe();
    getRecipeComments();
  }, []);

  const getRecipe = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/recipes/${props.match.params.title}`)
      .then((res) => {
        setRecipe(res.data[0]);
        setLoading(false);
        getRecipeComments(res.data[0].id);

        getCategoryById(res.data[0].categoryId);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getRecipeComments = (id) => {
    setCommentsLoading(true);
    axios
      .get(`http://localhost:4000/comments/${id}`)
      .then((res) => {
        setComments(res.data);
        setCommentsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getCategoryById = (id) => {
    setCategoryLoading(true);
    axios
      .get(`http://localhost:4000/category/${id}`)
      .then((res) => {
        setCategoryName(res.data[0].name);
        setCategoryLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleInput = (e) => {
    setComment(e.target.value);
  };
  const postComment = () => {
    let comment = {
      username: user.username,
      recipeId: recipe.id,
      comment: commentDescr,
    };
    axios
      .post(`http://localhost:4000/comments/`, { comment })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  if (isLoading || commentsLoading || categoryLoading) return null;

  return (
    <RecipePreview
      comments={comments}
      handleInput={handleInput}
      commentDescr={commentDescr}
      postComment={postComment}
      categoryName={categoryName}
      recipe={recipe}
    />
  );
};

export default withRouter(RecipePreviewContainer);
