import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LowCarbsRecipesStyle.css";
import { BigCard, SmallCard } from "../../../../packages/card/Card";
import { H2 } from "../../../../packages/text/Text";

const LowCarbsRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    setisLoading(true);
    axios
      .get(`http://localhost:4000/recipes`)
      .then((res) => {
        setRecipes(res.data);
        setisLoading(false);
      })
      .catch((e) => console.error(e));
  };

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.categoryId === "9db67959-77ff-42d5-b724-ca6c8bd74b01"
  );
  if (isLoading) return <div>...Loading</div>;

  return (
    <div className={"low_carbs_recipes"}>
      <div className="category">Нисковъглехидратни</div>
      <H2 h2={"Нисковъглехидратни рецепти за всеки вкус"} />
      <div className="low_carbs_recipes_wrapper">
        {filteredRecipes.slice(0, 1).map((recipe, index) => {
          return <BigCard key={index} recipe={recipe} />;
        })}
        <div className="low_carbs_sub_recipes">
          {filteredRecipes.slice(1, 3).map((recipe, index) => {
            return <SmallCard key={index} recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LowCarbsRecipes;
