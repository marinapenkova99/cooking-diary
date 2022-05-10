import React from "react";
import "./RecipeImageUploaderStyle.css";
import { Label } from "../../../packages/text/Text";

const RecipeImageUploader = ({ handleImageChange, imagePreviewUrl }) => {
  return (
    <div className="previewComponent">
      <Label label={"Качете снимка"} />
      <div className="image_uploader_wrapper">
        <input
          className="fileInput"
          type="file"
          onChange={(e) => handleImageChange(e)}
        />
      </div>
      {imagePreviewUrl ? (
        <img className="image_preview" src={imagePreviewUrl} alt="preview" />
      ) : null}
    </div>
  );
};

export default RecipeImageUploader;
