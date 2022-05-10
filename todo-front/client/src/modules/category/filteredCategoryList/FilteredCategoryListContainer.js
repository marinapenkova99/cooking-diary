import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { SmallHorizontalCard } from "../../../packages/card/Card";

const FilteredCategoryListContainer = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, [props.match.params.name]);

  const fetchCategories = () => {
    setCategoriesLoading(true);
    axios
      .get(`http://localhost:4000/category`)
      .then((res) => {
        const filteredCategories = res.data.filter(
          (category) => category.name === props.match.params.name
        );
        setCategories(filteredCategories);
        fetchRecipes(filteredCategories[0].id);
        setCategoriesLoading(false);
      })
      .catch((e) => console.error(e));
  };
  const fetchRecipes = (categoryId) => {
    setisLoading(true);
    axios
      .get(`http://localhost:4000/recipes`)
      .then((res) => {
        const filteredRecipes = res.data.filter(
          (recipe) => recipe.categoryId === categoryId
        );
        setRecipes(filteredRecipes);
        setisLoading(false);
      })
      .catch((e) => console.error(e));
  };
  if (isLoading || categoriesLoading) return null;
  return (
    <div className="page_wrapper">
      <div className="section_wrapper">
        <h1 className="h1 main_title">
          Рецепти от категория <span>{categories[0].name}</span>
        </h1>
        {recipes.map((recipe, index) => {
          let date = moment.unix(recipe.Date).format("DD.MM.YYYY");
          return (
            <SmallHorizontalCard key={index} date={date} recipe={recipe} />
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(FilteredCategoryListContainer);
