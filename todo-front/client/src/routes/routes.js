import React from "react";
import { Switch } from "react-router-dom";
import UserProfileRecipesListContainer from "../modules/recipes/userProfileList/UserProfileRecipesListContainer";
import LoginContainer from "../modules/user/login/LoginContainer";
import RegisterContainer from "../modules/user/register/RegisterContainer";
import LayoutRoute from "./LayoutRoute";
import HomePage from "../modules/home/pages/HomePage";
import RecipesListContainer from "../modules/recipes/list/RecipesListContainer";
import RecipePreviewContainer from "../modules/recipes/preview/RecipePreviewContainer";
import UserProfileContainer from "../modules/user/profile/UserProfileContainer";
import CreateRecipeContainer from "../modules/recipes/createRecipe/CreateRecipeContainer";
import RecipeEditContainer from "../modules/recipes/editRecipe/RecipeEditContainer";
import CreateCategoryContainer from "../modules/category/create/CreateCategoryContainer";
import CategoryListContainer from "../modules/category/list/CategoryListContainer";
import EditCategoryContainer from "../modules/category/edit/EditCategoryContainer";
import NewsletterEmailsList from "../modules/newsletter/NewsletterEmailsList";
import ContactsContainer from "../modules/contacts/create/ContactsContainer";
import AboutUs from "../modules/aboutUs/AboutUs";
import FilteredCategoryListContainer from "../modules/category/filteredCategoryList/FilteredCategoryListContainer";
import ContactsList from "../modules/contacts/list/ContactsList";

const Routes = () => (
  <Switch>
    <LayoutRoute exact path="/" component={HomePage} />
    <LayoutRoute exact path="/login" component={LoginContainer} />
    <LayoutRoute exact path="/my_profile" component={UserProfileContainer} />
    <LayoutRoute exact path="/register" component={RegisterContainer} />
    <LayoutRoute exact path="/recipes" component={RecipesListContainer} />
    <LayoutRoute
      exact
      path="/my_profile/recipes"
      component={UserProfileRecipesListContainer}
    />
    <LayoutRoute
      exact
      path="/my_profile/recipe/create"
      component={CreateRecipeContainer}
    />
    <LayoutRoute
      exact
      path="/рецепта/:title"
      component={RecipePreviewContainer}
    />
    <LayoutRoute
      exact
      path="/my_profile/recipe/:title"
      component={RecipeEditContainer}
    />
    <LayoutRoute
      exact
      path="/my_profile/categories"
      component={CategoryListContainer}
    />
    <LayoutRoute
      exact
      path="/my_profile/category/create"
      component={CreateCategoryContainer}
    />
    <LayoutRoute
      exact
      path="/my_profile/category/:id"
      component={EditCategoryContainer}
    />
    <LayoutRoute
      exact
      path="/my_profile/emails"
      component={NewsletterEmailsList}
    />
      <LayoutRoute
      exact
      path="/my_profile/contacts"
      component={ContactsList}
    />
    <LayoutRoute exact path="/contacts" component={ContactsContainer} />
    <LayoutRoute exact path="/about-us" component={AboutUs} />
    <LayoutRoute
      exact
      path="/категория/:name"
      component={FilteredCategoryListContainer}
    />
  </Switch>
);
export default Routes;
