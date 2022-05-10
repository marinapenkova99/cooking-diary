import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import RecipeImageUploader from "../recipeImageUploader/RecipeImageUploader";
import TextEditor from "../textEditor/TextEditor";
import UserLayout from "../../../packages/userLayout/UserLayout";
import OrangeButton from "../../../packages/buttons/orangeButton/OrangeButton";
import { withRouter } from "react-router-dom";
import { Label } from "../../../packages/text/Text";
import Input from "../../../packages/input/Input";
import "./../../../packages/input/InputStyle.css";
import "./../../../packages/text/TextStyle.css";

const RecipeEditContainer = (props) => {
  const [file, setFile] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState({
    image: "",
    title: "",
    date: "",
    description: "",
    cookingTime: "",
    levelOfDifficulty: 0,
    categoryId: "",
  });

  useEffect(() => {
    fetchRecipe();
    getCategoryById();
    fetchCategories();
  }, []);

  const fetchRecipe = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/recipes/${props.match.params.title}`)
      .then((res) => {
        setRecipeInfo({
          ...recipeInfo,
          title: res.data[0].title,
          date: moment.unix(res.data[0].Date).format("YYYY-MM-DD"),
          description: res.data[0].description,
          image: res.data[0].image,
          categoryId: res.data[0].categoryId,
          levelOfDifficulty: res.data[0].level_of_difficulty,
          cookingTime: res.data[0].cooking_time,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const fetchCategories = () => {
    setCategoriesLoading(true);
    axios
      .get(`http://localhost:4000/category`)
      .then((res) => {
        setCategories(res.data);
        setCategoriesLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getCategoryById = () => {
    setCategoryLoading(true);
    axios
      .get(`http://localhost:4000/category/${recipeInfo.categoryId}`)
      .then((res) => {
        setCategoryName(res.data[0].categoryName);
        setCategoryLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleSubmit = () => {
    let recipe = {
      title: recipeInfo.title,
      Date: new Date(recipeInfo.date).getTime() / 1000,
      description: recipeInfo.description,
      image: recipeInfo.image,
      categoryId: recipeInfo.categoryId,
      level_of_difficulty: recipeInfo.levelOfDifficulty,
      cooking_time: recipeInfo.cookingTime,
    };

    axios
      .put(`http://localhost:4000/recipes/${props.match.params.title}`, {
        recipe,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChange = (e) => {
    setRecipeInfo({ ...recipeInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setRecipeInfo({ ...recipeInfo, image: reader.result });
    };

    reader.readAsDataURL(file);
  };
  const handleQuillChange = (value) => {
    setRecipeInfo({ ...recipeInfo, description: value });
  };

  if (categoriesLoading || isLoading || categoryLoading) return null;
  return (
    <div className="page_wrapper">
      <UserLayout>
        <h2 className="h2">Редактирай рецепта с име: {recipeInfo.title}</h2>{" "}
        <RecipeImageUploader
          handleImageChange={handleImageChange}
          imagePreviewUrl={recipeInfo.image}
        />
        <div>
          <Label label={"Заглавие"} />
          <Input
            handleInput={handleChange}
            name="title"
            type="text"
            value={recipeInfo.title}
          />{" "}
          <Label label={"Дата"} />
          <Input
            handleInput={handleChange}
            name="date"
            type="text"
            value={recipeInfo.date}
          />
          <Label label={"Време за приготване"} />
          <Input
            handleInput={handleChange}
            name="cookingTime"
            type="text"
            value={recipeInfo.cookingTime}
          />{" "}
          <Label label={"Трудност"} />
          <Input
            handleInput={handleChange}
            name="levelOfDifficulty"
            type="text"
            value={recipeInfo.levelOfDifficulty}
          />{" "}
          <Label label={"Описание"} />
          <TextEditor
            placeholder={"Започнете да пишете..."}
            value={recipeInfo.description}
            onTextEditorChange={(text) => handleQuillChange(text)}
          />{" "}
          <Label label={"Изберете категория"} />
          <select
            className="input"
            onChange={handleChange}
            name={"categoryId"}
            value={recipeInfo.categoryId}
          >
            <option value=""> Choose category</option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <div className="btn_wrapper">
            <OrangeButton onClick={handleSubmit} text={"Редактирай"} />
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default withRouter(RecipeEditContainer);
