import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeImageUploader from "../recipeImageUploader/RecipeImageUploader";
import TextEditor from "../textEditor/TextEditor";
import UserLayout from "../../../packages/userLayout/UserLayout";
import OrangeButton from "../../../packages/buttons/orangeButton/OrangeButton";
import { H2, Label } from "../../../packages/text/Text";
import Input from "../../../packages/input/Input";
import "./../../../packages/input/InputStyle.css";
const CreateRecipeContainer = (props) => {
  const [errors, setErrors] = useState({
    title: "",
    date: "",
    description: "",
    cookingTime: "",
    levelOfDifficulty: '',
    selectedCategory: "",
    imagePreviewUrl: "",
  });
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState({
    id: Math.random() * 1000,
    title: "",
    date: "",
    description: "",
    cookingTime: "",
    levelOfDifficulty: 0,
    selectedCategory: "",
  });
  useEffect(() => {
    fetchCategories();
  }, []);
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
  const validateForm = () => {
    let isValid = true;
    let recipeErrors = {
      title: "",
      date: "",
      description: "",
      cookingTime: "",
      levelOfDifficulty: '',
      selectedCategory: "",
      imagePreviewUrl: "",
    };
    if (recipeInfo.title.length < 1 || recipeInfo.title.length > 200) {
      isValid = false;
      recipeErrors.title = "Моля въведете валидно заглавие";
    }
    if (!recipeInfo.date.length) {
      isValid = false;
      recipeErrors.date = "Моля въведете валидна дата";
    }
    if (recipeInfo.description.length < 3) {
      isValid = false;
      recipeErrors.description = "Моля въведете описание";
    }
    if (recipeInfo.cookingTime.length < 1) {
      isValid = false;
      recipeErrors.cookingTime = "Моля въведете време за готвене";
    }
    if (recipeInfo.levelOfDifficulty < 1) {
      isValid = false;
      recipeErrors.levelOfDifficulty = "Моля въведете ниво на трудност";
    }
    if (!recipeInfo.selectedCategory) {
      isValid = false;
      recipeErrors.selectedCategory = "Моля изберете категория";
    }
    if (!imagePreviewUrl) {
      isValid = false;
      recipeErrors.imagePreviewUrl = "Моля изберете снимка";
    }
    setErrors({
      ...errors,
      title: recipeErrors.title,
      date: recipeErrors.date,
      description: recipeErrors.description,
      cookingTime: recipeErrors.cookingTime,
      levelOfDifficulty: recipeErrors.levelOfDifficulty,
      selectedCategory: recipeErrors.selectedCategory,
      imagePreviewUrl: recipeErrors.imagePreviewUrl,
    });

    return isValid;
  };
  const resetForm = () => {
    setErrors({
      title: "",
      date: "",
      description: "",
      cookingTime: "",
      levelOfDifficulty: '',
      selectedCategory: "",
      imagePreviewUrl: "",
    });
  };
  const handleSubmit = () => {
    let isCreateTaskFormValid = validateForm();

    if (!isCreateTaskFormValid) {
      return;
    }

    resetForm();
    let recipe = {
      id: recipeInfo.id,
      title: recipeInfo.title,
      Date: new Date(recipeInfo.date).getTime() / 1000,
      description:
        recipeInfo.description !== "" ? recipeInfo.description : undefined,
      image: imagePreviewUrl,
      categoryId: recipeInfo.selectedCategory,
      cooking_time: recipeInfo.cookingTime,
      level_of_difficulty: recipeInfo.levelOfDifficulty,
    };
    axios
      .post(`http://localhost:4000/recipes`, { recipe })
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => console.error(e));
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
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleQuillChange = (value) => {
    setRecipeInfo({ ...recipeInfo, description: value });
  };
  if (categoriesLoading) return null;
  return (
    <div className="page_wrapper">
      <UserLayout>
        <H2 h2={"Създай рецепта"} />
        <RecipeImageUploader
          handleImageChange={handleImageChange}
          imagePreviewUrl={imagePreviewUrl}
        />
        {errors.imagePreviewUrl && (
          <p className="error">{errors.imagePreviewUrl}</p>
        )}
        <Label label={"Заглавие"} />
        <Input
          handleInput={handleChange}
          value={recipeInfo.title}
          error={errors.title}
          type={"text"}
          name={"title"}
        />{" "}
        <Label label={"Дата"} />
        <Input
          handleInput={handleChange}
          value={recipeInfo.date}
          error={errors.date}
          type={"date"}
          name={"date"}
        />{" "}
        <Label label={"Време за приготване"} />
        <Input
          handleInput={handleChange}
          value={recipeInfo.cookingTime}
          error={errors.cookingTime}
          type={"text"}
          name={"cookingTime"}
        />{" "}
        <Label label={"Трудност"} />
        <Input
          handleInput={handleChange}
          value={recipeInfo.levelOfDifficulty}
          error={errors.levelOfDifficulty}
          type={"text"}
          name={"levelOfDifficulty"}
        />
        <Label label={"Описание"} />
        <TextEditor
          placeholder={"Започнете да пишете..."}
          value={recipeInfo.description}
          onTextEditorChange={(text) => handleQuillChange(text)}
        />{" "}
        {errors.description && <p className="error">{errors.description}</p>}
        <Label label={"Изберете категория"} />
        <select
          className="input"
          onChange={handleChange}
          name={"selectedCategory"}
          value={recipeInfo.selectedCategory}
        >
          <option value=""> Категория</option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {errors.selectedCategory && (
          <p className="error">{errors.selectedCategory}</p>
        )}
        <div className="btn_wrapper">
          <OrangeButton onClick={handleSubmit} text={"Създай"} />
        </div>
      </UserLayout>
    </div>
  );
};

export default CreateRecipeContainer;
