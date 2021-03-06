import React from "react";
import "./AboutUsStyle.css";
import { H1 } from "../../packages/text/Text";

const AboutUs = (props) => {
  return (
    <div className="about_us">
      <img src={"/aboutUs.png"} alt="about-us" />
      <div className="about_us_content">
        <H1 h1={"Малко повече за нас"} />
        <div className="about_us_description">
          <p>
            Храната е здраве! Храната сплотява! Вдъхновени от тези идеи,
            CookingDiary има за цел да превърне готвенето в удоволствие,
            независимо от повода. В уютна обстановка и в добра компания всеки ще
            се почувства у дома си и ще забрави поне за малко ежедневните си
            проблеми. Без значение какъв опит имате в кухнята - всеки е добре
            дошъл да изживее магията на кулинарното изкуство.
          </p>
          <p>
            CookingDiary, неповторимия блог за кулинарни рецепти, бе създаден с
            много емоции и любов. Целта на платформата е предостави нови и
            креативни кулинарни изкушения, които да могат да се приготвят от
            всеки, стига да има желание. Всяка рецепта има посочено време на
            приготвяне, нужните съставки и начина приготвяне, за да може
            потребителя да се ориентира, какво ще му е нужно за приготвянето на
            ястието и колко време ще му отнеме. Разбира се, ако рецептата е
            отговорила на вашите очаквания може да оставите по един коментар.
          </p>
          <p>
            Надяваме се , че нашето кулинарно изкуство ще достигне до вашите
            сърца и ще ви вдъхнови да се развихрите в кухнята!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
