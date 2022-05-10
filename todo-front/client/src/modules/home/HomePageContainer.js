import React from "react";
import HomeSlider from "./components/homeSlider/HomeSlider";
import AboutUs from "./components/aboutUs/AboutUs";
import MostPopularRecipes from "./components/mostPopularRecipes/MostPopularRecipes";
import NewestRecipes from "./components/newestRecipes/NewestRecipes";
import LowCarbsRecipes from "./components/LowCarbsRecipes/LowCarbsRecipes";
import Reviews from "./components/reviews/Reviews";
const HomePageContainer = (props) => {
  return (
    <>
      <HomeSlider />
      <NewestRecipes />
      <MostPopularRecipes />
      <AboutUs />
      <LowCarbsRecipes />
      <Reviews />
    </>
  );
};

export default HomePageContainer;
