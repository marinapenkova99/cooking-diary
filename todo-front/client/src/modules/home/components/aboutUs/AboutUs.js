import React from "react";
import "./AboutUsStyle.css";
import OrangeButton from "../../../../packages/buttons/orangeButton/OrangeButton";

const AboutUs = () => {
  return (
    <section className="about_us_section">
      <img src={"/about-us-img.png"} alt="about-us" />
      <div className="about_us_section_content">
        <div className="category">За нас</div>
        <h2>Научете повече за нашия кулинарен блог</h2>
        <p>
          С CookingDiary ще ви накараме да развихрите вашето въображение. Ние ще
          Ви покажем, как едно традиционно ястие, може да бъде превърнато в
          екстравагантно кулинарно изкушение и как любимия десерт може да бъде
          също толкова впечатляващ без излишните въглехидрати в него.
        </p>
        <div className="btn_wrapper">
          <OrangeButton linkTo={"/about-us"} text={"Виж още"} />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
