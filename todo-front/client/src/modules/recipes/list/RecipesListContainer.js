import React, { useEffect, useState } from "react";
import axios from "axios";
import { H1 } from "../../../packages/text/Text";
import moment from "moment";
import { SmallHorizontalCard } from "../../../packages/card/Card";
import OrangeButton from "../../../packages/buttons/orangeButton/OrangeButton";

const RecipesListContainer = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeToShow, setRecipesToShow] = useState(8);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/recipes`)
      .then((res) => {
        setRecipes(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };
  const fetchCategories = () => {
    setCategoriesLoading(true);
    axios
      .get(`http://localhost:4000/category`)
      .then((res) => {
        setCategories(res.data);
        setCategoriesLoading(false);
      })
      .catch((e) => console.error(e));
  };
  const showMore = () => {
    setRecipesToShow(recipeToShow + 8);
  };
  if (isLoading || categoriesLoading) return <p>Loading</p>;
  return (
    <div className="page_wrapper">
      <div className="section_wrapper">
        <H1 h1={"Всички рецепти"} className={"h1 main_title"} />
        {recipes.slice(0, recipeToShow).map((recipe, index) => {
          let date = moment.unix(recipe.Date).format("DD.MM.YYYY");
          let filteredCategory = categories.filter(
            (category) => category.id === recipe.categoryId
          );
          return (
            <SmallHorizontalCard
              key={index}
              recipe={recipe}
              category={filteredCategory}
              date={date}
            />
          );
        })}
        {recipeToShow < recipes.length && (
          <div
            className="btn_wrapper"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <OrangeButton onClick={showMore} text={"Покажи още"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesListContainer;
