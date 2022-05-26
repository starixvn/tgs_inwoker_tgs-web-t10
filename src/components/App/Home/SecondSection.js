import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import SectionTwo from "../../../assets/images/home/section/section2.png";
import LeftModelPNG from "../../../assets/images/home/section/left-model.png";
import SliderPNG from "../../../assets/images/home/section/game-slider.png";
import SliderSelectedPNG from "../../../assets/images/home/section/game-slider-selected.png";
import Common from "../../../utils/Common";
import {GameTypeEnum} from "../../../api-services/utils/Enum";
import ScrollAnimation from "react-animate-on-scroll";
const GameSelectorWithSlider = styled.div`
  height: 606px;
  width: 1280px;
  margin: 0 auto;
  background: url(${SectionTwo})  no-repeat;
  background-position: 148px 18px;
}

  margin-top: 14px;

  position: relative;
  overflow: visible;
`;
const TitleContainer = styled(ScrollAnimation)`
  height: 200px;
  width: 316px;
  background: url(${(props) => props.img}) center no-repeat;
  position: absolute;
  left: 293px;
  top: 103px;
  z-index: 99;
`;
const LeftModel = styled.div`
  height: 606px;
  width: 610px;
  float: left;
  background: url(${LeftModelPNG}) center top no-repeat;
  margin-left: -110px;
`;
const GameSlider = styled.div`
  height: 11px;
  width: 52px;
  transition: background 300ms linear;
  background: url(${(props) => {
      return props.selected ? SliderSelectedPNG : SliderPNG;
    }})
    center no-repeat;
  cursor: pointer;
  margin: 0px 10px;
`;

const GameSliderButtonContainer = styled.div`
  padding: 10px 0px;
  position: absolute;
  bottom: 124px;
  left: 50%;
  display: flex;
  margin-left: 460px;
`;
const GameModelContainer = styled.div`
  width: 663px;
  height: 533px;
  float: right;
  position: relative;
  margin-top: -5px;
  margin-right: 42px;
`;
const TheGameGirl = styled.div`
  width: 663px;
  height: 533px;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  transition: opacity 300ms linear;
  opacity: 0;
  ${(props) => (props.selected === true ? `opacity:1;` : ``)}
`;

const SecondSection = (props) => {
  const [selected, setSelected] = useState(0);

  var timerAnimation = null;
  useEffect(() => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    timerAnimation = setAnimation();
  }, [selected]);
  const handleSliderClick = (index) => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    setSelected(index);
  };
  const setAnimation = () => {
    return setTimeout(() => {
      if (selected >= 1) {
        setSelected(0);
      } else {
        setSelected(selected + 1);
      }
    }, 3000);
  };

  return (
    <GameSelectorWithSlider>
      <TitleContainer
        animateIn="flipInY"
        animateOut="flipOutY"
        style={{ overflow: "visible" }}
        img={
          process.env.PUBLIC_URL +
          "/assets/images/" +
          Common.getLanguagePrefixFolder() +
          "/section2-title.png"
        }
      ></TitleContainer>

      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <LeftModel />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn="fadeInRight"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <GameModelContainer>
          {props.game.homePageGameList
            .filter((game) => game.type === GameTypeEnum.LIVELOBBY)
            .map((item, index) => {
              if (index < 2) {
                return (
                  <TheGameGirl
                    key={index}
                    selected={selected === index}
                    img={
                      process.env.PUBLIC_URL +
                      `/assets/images/provider/girl-${item.abbreviation.toLowerCase()}.png`
                    }
                  />
                );
              }
            })}
        </GameModelContainer>
      </ScrollAnimation>

      <GameSliderButtonContainer>
        {props.game.homePageGameList
          .filter((game) => game.type === GameTypeEnum.LIVELOBBY)
          .map((item, index) => {
            if (index < 2) {
              return (
                <GameSlider
                  selected={selected === index}
                  onClick={() => {
                    clearTimeout(timerAnimation);
                    handleSliderClick(index);
                  }}
                />
              );
            }
          })}
      </GameSliderButtonContainer>
    </GameSelectorWithSlider>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStateToProps, null)(SecondSection);
