import React from "react";
import "./HomeSliderStyle.css";
import OrangeButton from "../../../../packages/buttons/orangeButton/OrangeButton";
import { H1 } from "../../../../packages/text/Text";

const HomeSlider = () => {
  return (
    <div className={"home_slider"}>
      <img src={"/home-slide.jpg"} alt={"home"} />
      <div className="home_slide_content">
        <H1
          h1={"Вашите любими рецепти с ниско количество на въглехидрати."}
        />
        <p>
          Насладете се на храна с богат вкус, докато извайвате желаната фигура.
          Кажете <span>СТОП </span> на лишенията.
        </p>
        <OrangeButton
          linkTo={"/категория/Нисковъглехидратни"}
          text={"Виж още"}
        />
      </div>
    </div>
  );
};

export default HomeSlider;
