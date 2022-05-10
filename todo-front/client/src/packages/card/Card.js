import React from "react";
import { Link } from "react-router-dom";
import OrangeButton from "../buttons/orangeButton/OrangeButton";
import "./CardStyle.css";
export const SmallVerticalCard = ({ recipe, category }) => {
  return (
    <Link to={`рецепта/${recipe.title}`} className={"most_popular_recipe_card"}>
      <div className="recipe_card_category">{category[0].name}</div>
      <div className="most_popular_recipe_card_image_holder">
        <img src={recipe.image} alt="card" />
      </div>
      <h3>{recipe.title}</h3>
    </Link>
  );
};

export const BigCard = ({ recipe }) => {
  return (
    <div className="low_carbs_main_recipe">
      <img src={recipe.image && recipe.image} alt="low-carbs" />
      <div className="low_carbs_main_recipe_layout">
        <h3>{recipe.title}</h3>
        <OrangeButton
          text={"Виж още"}
          linkTo={`/рецепта/${recipe.title}`}
        />{" "}
      </div>
    </div>
  );
};

export const SmallHorizontalCard = ({ recipe, date, category }) => {
  return (
    <div className="recipe_holder">
      <Link to={`/рецепта/${recipe.title}`} className="recipe_image_holder">
        <img src={recipe.image} alt={"image"} />
      </Link>
      <div className="recipe_content">
        {category && (
          <Link
            className={"recipe_list_category"}
            to={`/категория/${category[0].name}`}
          >
            {category[0].name}
          </Link>
        )}

        <Link to={`/рецепта/${recipe.title}`}>{recipe.title}</Link>
        <div className="recipe_date">{date}</div>
        <div
          className="recipe_description"
          dangerouslySetInnerHTML={{
            __html: recipe.description,
          }}
        />
      </div>
    </div>
  );
};
export const SmallCard = ({ recipe }) => {
  return (
    <div className="low_carbs_sub_recipe">
      <img src={recipe.image && recipe.image} alt="ow-carbs" />
      <div className="low_carbs_sub_recipe_layout">
        <h3>{recipe.title}</h3>
        <OrangeButton
          text={"Виж още"}
          linkTo={`/рецепта/${recipe.title}`}
        />{" "}
      </div>
    </div>
  );
};
