import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import SliderPNG from "../../../assets/images/home/section/game-slider.png";
import SliderBackgroundPNG from "../../../assets/images/home/section/game-slider-bg.png";
import Section2SlotsPNG from "../../../assets/images/home/section/section2-slots.png";
import Section2ChessPNG from "../../../assets/images/home/section/section2-chess.png";
import Section2ElectronPNG from "../../../assets/images/home/section/section2-electron.png";
import Section2LivePNG from "../../../assets/images/home/section/section2-live.png";
import Section2SportsPNG from "../../../assets/images/home/section/section2-sports.png";
import Section2EsportsPNG from "../../../assets/images/home/section/section2-esports.png";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import ScrollAnimation from "react-animate-on-scroll";
import Slider from "react-slick";

const GameSelectorWithSlider = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  overflow: visible;
  cursor: pointer;
  user-select: none;
`;

const handleFirstLastChild = (index) => {
  return `
  .slick-slide:nth-child(${index + 5}) &:before, .slick-slide:nth-child(${
    index + 9
  }) &:before{ 
    z-index: 1; 
    transform: scale(0.85); 
    transition: all .5s;     
    opacity: 1;
  }
  .slick-slide:nth-child(${
    index + 5
  }) & ${SliderImgTitle}, .slick-slide:nth-child(${
    index + 6
  }) & ${SliderImgTitle} ,.slick-slide:nth-child(${
    index + 7
  }) & ${SliderImgTitle},
  .slick-slide:nth-child(${
    index + 5
  }) & ${SliderImgButton}, .slick-slide:nth-child(${
    index + 6
  }) & ${SliderImgButton} ,.slick-slide:nth-child(${
    index + 7
  }) & ${SliderImgButton}  {
    display: block;
  }
  .slick-slide:nth-child(${index + 6}) &:before, .slick-slide:nth-child(${
    index + 8
  }) &:before{ 
    z-index: 2; 
    transform: scale(0.85); 
    transition: all .5s;     
    opacity: 1;
  }
  .slick-slide:nth-child(${index + 7}) &:before {
    z-index: 3;
    transform: scale(1);
    transition: all .5s;
    opacity: 1;
  }
  `;
};

const SliderImg = styled.div`
  width: 256px;
  height: 382px;
  transition: all 0.2s ease-in;
  color: #ffffff;
  ${(props) => handleFirstLastChild(props.current)}
  :before {
    content: " ";
    position: absolute;
    margin-left: -1.5%;
    width: 487px;
    height: 375px;
    border-radius: 13px;
    z-index: -1;
    opacity: ${(props) => (props.isSliding ? "1" : "0")};
    background: url(${(props) => props.img}) no-repeat;
    transform: scale(0.85);
    transition: all 0.5s;
    background-position: bottom;
  }
`;

const SliderImgTitle = styled.div`
  font-size: 1.5em;
  display: none;
  transform: translate(-27px, 158px);
  z-index: 3;
  position: absolute;
`;

const SliderImgButton = styled.div`
  font-size: 14px;
  color: #fff;
  text-align: center;
  width: 85px;
  border-radius: 6px;
  border: solid 1px #e4eaff;
  margin-top: 25px;
  height: 34px;
  line-height: 2em;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.primary};
  }
  display: none;
  transform: translate(-27px, 195px);
  z-index: 3;
  position: absolute;
`;

const SliderBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: url(${SliderBackgroundPNG}) no-repeat;
  width: 1038px;
  height: 68px;
  margin: 0 auto;
  margin-top: 90px;
  padding-right: 7px;
`;

const SliderButton = styled.div`
  background: ${(props) => {
    return props.selected ? `url(${SliderPNG}) no-repeat` : "none";
  }};
  width: 131px;
  height: 64px;
  background-position: 3px 5px;
`;

const SliderButtonLabel = styled.div`
  font-size: 14px;
  color: ${(props) => {
    return props.selected ? "#0C5AAC" : "#FFFFFF";
  }};
  transition: color 0.1s ease-in;
  text-align: center;
  padding-top: 23px;
`;

const SecondSection = (props) => {
  const [current] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const slider = useRef(null);
  const handleOverlayClick = (index) => {
    slider.current.slickGoTo(index);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10px",
    variableWidth: true,
    adaptiveHeight: true,
    speed: 300,
    draggable: false,
    swipe: false,
    cssEase: "linear",
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setActiveSlide2(next);
      setIsSliding(true);
    },
    afterChange: (current) => {
      setActiveSlide2(current);
      setIsSliding(false);
    },
  };

  const secondSectionSlides = [
    {
      path: "live",
      img: Section2LivePNG,
      type: "live",
      name: i18n.t("common.live"),
    },
    {
      path: "chess",
      img: Section2ChessPNG,
      type: "chess",
      name: i18n.t("common.chess"),
    },
    {
      path: "sports",
      img: Section2SportsPNG,
      type: "sports",
      name: i18n.t("common.sport"),
    },
    {
      path: "esports",
      img: Section2EsportsPNG,
      type: "esports",
      name: i18n.t("common.esports"),
    },
    {
      path: "slots",
      img: Section2SlotsPNG,
      type: "slots",
      name: i18n.t("common.slot"),
    },
    {
      path: "electron",
      img: Section2ElectronPNG,
      type: "electron",
      name: i18n.t("common.electron"),
    },
  ];

  return (
    <GameSelectorWithSlider current={activeSlide2}>
      <ScrollAnimation
        animateIn="fadeInRight"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <Slider {...settings} ref={slider}>
          {secondSectionSlides.map((item, index) => {
            return (
              <div key={index}>
                <SliderImg
                  index={index}
                  current={activeSlide2}
                  isSliding={isSliding}
                  img={item.img}
                  background={item.background}
                  onClick={() => handleOverlayClick(index)}
                >
                  <SliderImgTitle>{item.name}</SliderImgTitle>
                  <SliderImgButton
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      props.navigate(`/${i18n.language}/${item.path}`);
                    }}
                  >
                    {i18n.t("withdrawal.checkDetails")}
                  </SliderImgButton>
                </SliderImg>
              </div>
            );
          })}
        </Slider>

        <SliderBar>
          {secondSectionSlides.map((item, index) => {
            return (
              <div key={index}>
                <SliderButton
                  selected={activeSlide2 === index}
                  onClick={() => handleOverlayClick(index)}
                >
                  <SliderButtonLabel selected={activeSlide2 === index}>
                    {item.name}
                  </SliderButtonLabel>
                </SliderButton>
              </div>
            );
          })}
        </SliderBar>
      </ScrollAnimation>
    </GameSelectorWithSlider>
  );
};

export default SecondSection;
