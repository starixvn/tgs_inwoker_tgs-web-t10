import { Grid, Container as MContainer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import StartGamePNG from "../../../assets/images/start-game.png";
import StartGameHoverPNG from "../../../assets/images/start-game-hover.png";

import {GameEnum,GameTypeEnum} from "../../../api-services/utils/Enum";
import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";
const Background = styled.div`
  height: 580px;

  z-index: 3;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/" +
    i18n.language +
    `/ky-hotgame-bg.jpg`})
    center no-repeat;
  padding-top: 40px;
`;

const Container = styled(Grid)`
  color: white;
  position: relative;
  height: 100%;
`;

const AGContentStartGame = styled.div`
  position: absolute;
  width: 167px;
  height: 41px;

  background: url(${StartGamePNG}) no-repeat;
  &:hover {
    cursor: pointer;
    background: url(${StartGameHoverPNG}) no-repeat;
  }
  color: #fff;
  font-size: 17px;
  padding: 0px 50px 0px 5px;
  text-align: center;
  line-height: 40px;
  top: 371px;

  left: 50%;
  margin-left: 57px;
`;

const Games = styled.img`
  height: 130px;
  width: auto;

  cursor: pointer;
  transition: transform 150ms linear;
  :hover {
    transform: Scale(1.1);
    transform-origin: center center;
  }
`;

const GameButton = styled(Grid)`
  width: 180px;
  align-items: center;
  height: 180px;
`;

const GameSection = (props) => {
  return (
    <GameButton item>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100%" }}
      >
        {props.children}
      </Grid>
    </GameButton>
  );
};

const ThirdSection = (props) => {
  const GetUrl = (item) => {
    return (
      process.env.PUBLIC_URL +
      "/assets/images/" +
      i18n.language +
      `/ky-hotgame${item}.png`
    );
  };

  return (
    <Background>
      <MContainer style={{ height: "100%" }}>
        <Grid container style={{ height: "100%", position: "relative" }}>
          <ScrollAnimation
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <Container>
              <Grid
                container
                direction="column"
                justify="center"
                alignContent="center"
                style={{ height: "100%", paddingTop: "30px" }}
              >
                <Grid item>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing="3"
                  >
                    <GameSection>
                      <Games
                        src={GetUrl(1)}
                        onClick={() =>
                          props.handleJoinGameClick(
                            GameTypeEnum.QIPAILOBBY,
                            "",
                            GameEnum.KY,
                            "/" +
                              i18n.language +
                              "/joingame/" +
                              GameTypeEnum.QIPAILOBBY +
                              "/" +
                              GameEnum.KY
                          )
                        }
                      />
                    </GameSection>
                    <GameSection>
                      <Games
                        src={GetUrl(2)}
                        onClick={() =>
                          props.handleJoinGameClick(
                            GameTypeEnum.QIPAILOBBY,
                            "",
                            GameEnum.KY,
                            "/" +
                              i18n.language +
                              "/joingame/" +
                              GameTypeEnum.QIPAILOBBY +
                              "/" +
                              GameEnum.KY
                          )
                        }
                      />
                    </GameSection>
                    <GameSection>
                      <Games
                        src={GetUrl(3)}
                        onClick={() =>
                          props.handleJoinGameClick(
                            GameTypeEnum.QIPAILOBBY,
                            "",
                            GameEnum.KY,
                            "/" +
                              i18n.language +
                              "/joingame/" +
                              GameTypeEnum.QIPAILOBBY +
                              "/" +
                              GameEnum.KY
                          )
                        }
                      />
                    </GameSection>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing="3"
                  >
                    <GameSection>
                      <Games
                        src={GetUrl(4)}
                        onClick={() =>
                          props.handleJoinGameClick(
                            GameTypeEnum.QIPAILOBBY,
                            "",
                            GameEnum.KY,
                            "/" +
                              i18n.language +
                              "/joingame/" +
                              GameTypeEnum.QIPAILOBBY +
                              "/" +
                              GameEnum.KY
                          )
                        }
                      />
                    </GameSection>
                    <GameSection>
                      <Games
                        src={GetUrl(5)}
                        onClick={() =>
                          props.handleJoinGameClick(
                            GameTypeEnum.QIPAILOBBY,
                            "",
                            GameEnum.KY,
                            "/" +
                              i18n.language +
                              "/joingame/" +
                              GameTypeEnum.QIPAILOBBY +
                              "/" +
                              GameEnum.KY
                          )
                        }
                      />
                    </GameSection>
                    <GameSection>
                      <Games
                        src={GetUrl(6)}
                        onClick={() =>
                          props.handleJoinGameClick(
                            GameTypeEnum.QIPAILOBBY,
                            "",
                            GameEnum.KY,
                            "/" +
                              i18n.language +
                              "/joingame/" +
                              GameTypeEnum.QIPAILOBBY +
                              "/" +
                              GameEnum.KY
                          )
                        }
                      />
                    </GameSection>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </ScrollAnimation>

          <AGContentStartGame
            onClick={() =>
              props.handleJoinGameClick(
                GameTypeEnum.QIPAILOBBY,
                "",
                GameEnum.KY,
                "/" +
                  i18n.language +
                  "/joingame/" +
                  GameTypeEnum.QIPAILOBBY +
                  "/" +
                  GameEnum.KY
              )
            }
          >
            {i18n.t("common.startGame")}
          </AGContentStartGame>
        </Grid>
      </MContainer>
    </Background>
  );
};

export default ThirdSection;
