import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { SmallVerticalCard } from "../../../../packages/card/Card";
import { H2 } from "../../../../packages/text/Text";

const MostPopularRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isCategoriesLoading, setCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState(false);
  useEffect(() => {
    fetchRecipes();
    fetchCategories();
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
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  if (isLoading || isCategoriesLoading) return <div>...</div>;
  let newRecipes = recipes.sort(() => Math.random() - 0.5);

  return (
    <section className="slider_section">
      <H2 h2={"Най-популярните ни рецепти"} />
      <Slider className="slider_wrapper" {...settings}>
        {newRecipes.map((recipe, index) => {
          let category = categories.filter(
            (category) => category.id === recipe.categoryId
          );
          return (
            <SmallVerticalCard
              key={index}
              category={category}
              recipe={recipe}
            />
          );
        })}
      </Slider>
    </section>
  );
};

export default MostPopularRecipes;
