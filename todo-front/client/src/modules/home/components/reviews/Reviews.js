import React from "react";
import "./ReviewsStyle.css";
import Slider from "react-slick";
import { faStar } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextArrow, PrevArrow } from "./SlickArrows";
import { H2 } from "../../../../packages/text/Text";

const Reviews = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <section className="reviews_section">
      <H2 h2={"Какво казват хората за нас"} />
      <Slider className="slider_wrapper" {...settings}>
        <div className="review">
          <img src={"/reviewer1.png"} alt="reviewer" />
          <div className="review_content">
            <p>
              "Невероятно полезен блог. Рецептите са оригинални и новаторски с
              нотка на традиционната ни кухня . Продължавайте да импровизирате и
              да ни радвате с нови ястия."
            </p>
            <div className="stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="reviewer_name">Мария Тенева</div>
          </div>
        </div>{" "}
        <div className="review">
          <img src={"/reviewer2.png"} alt="reviewer" />
          <div className="review_content">
            <p>
              "В блога има страхотни идеи за нисковъглехидратни рецепти, което
              много ми помогна за свалянето на килограми. Невероятно вкусни са,
              но и полезни. Няма да сбъркате с тях !"
            </p>
            <div className="stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="reviewer_name">Калоян Трендафилов</div>
          </div>
        </div>{" "}
        <div className="review">
          <img src={"/reviewer3.png"} alt="reviewer" />
          <div className="review_content">
            <p>
              "Рецептите Ви ми помогнаха да оформя така желаната фигура, а се
              съмнявах, защото бяха невероятно вкусни . Имате много добри идеи
              продължавайте да ги развивате!"
            </p>
            <div className="stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="reviewer_name">Петя Иванова</div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Reviews;
