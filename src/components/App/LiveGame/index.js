import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";

import config from "../../../config/config";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
const Container = styled.div`
  width: 100%;
  height: auto;

  padding: 70px 0px;
  position: relative;
  min-height: ${(props) =>
    props.GamePage_SpecificBackground ? "900px" : "870px"};
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/live/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat center;
`;
const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 172px;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  display: flex;
`;
const RightSlide = styled(ScrollAnimation)`
  display: flex;
`;
const ItemContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow: visible;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  display: none;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  cursor: not-allowed;
`;

const ImageWrapper = styled.div`
  position: relative;

  ${({ maintenance }) => {
    return maintenance
      ? `

    ${Maintenance}{
     
      display: flex;
    }
    ${GirlImage}{
      filter: brightness(40%) grayscale(200%);
    }
    
    
    `
      : ``;
  }}
`;

class LiveGame extends Component {
  constructor(props) {
    super(props);

    var liveList = props.game.homePageGameList
      .filter((item) => {
        return item.type === GameTypeEnum.LIVELOBBY;
      })
      .sort((a, b) => {
        if (config.features.LiveGame_Sorting_SKY) {
          var sortDGFirst = ["DG"];
          return (
            sortDGFirst.indexOf(b.abbreviation) -
            sortDGFirst.indexOf(a.abbreviation)
          );
        } else return b - a;
      });

    this.state = {
      selected: liveList[0],
      subMenu: null,
      isSelected: false,
      hide: true,
      list: liveList,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var liveList = this.props.game.homePageGameList
        .filter((item) => {
          return item.type === GameTypeEnum.LIVE;
        })
        .sort((a, b) => {
          if (config.features.LiveGame_Sorting_SKY) {
            var sortDGFirst = ["DG"];
            return (
              sortDGFirst.indexOf(b.abbreviation) -
              sortDGFirst.indexOf(a.abbreviation)
            );
          } else return b - a;
        });

      this.setState({
        ...this.state,
        selected: liveList[0],
        list: liveList,
      });
    }
  }
  triggerSetSelected = (bool) => {
    this.setState({
      isSelected: bool,
    });
    setTimeout(() => {
      this.triggerSetSelected(false);
    }, 800);
  };
  popup = null;
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;

      var win = window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.LIVELOBBY +
          "/" +
          params.toUpperCase(),
        "gamewindow",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );

      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    } else {
      this.props.showLogin(true);
    }
  };

  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container
        GamePage_SpecificBackground={
          config.features.GamePage_SpecificBackground
        }
      >
        <ItemContainer style={{ marginTop: 370 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list
              .slice(0, 3)
              .reverse()
              .sort((a, b) => {
                if (config.features.LiveGame_Sorting_SKY) {
                  var sortDGFirst = ["DG"];
                  return (
                    sortDGFirst.indexOf(b.abbreviation) -
                    sortDGFirst.indexOf(a.abbreviation)
                  );
                } else return b - a;
              })
              .map((item, index) => {
                return (
                  <ImageWrapper maintenance={item.status != 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <GirlImage
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/live/" +
                        item.abbreviation.toLowerCase() +
                        (item.abbreviation.toLowerCase() === "wgfm" ||
                        item.abbreviation.toLowerCase() === "wgvia"
                          ? "-" + i18n.language
                          : "") +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.abbreviation, item.type);
                      }}
                    />
                  </ImageWrapper>
                );
              })}
          </LeftSlide>
        </ItemContainer>
        <ItemContainer style={{ marginTop: 560 }}>
          <RightSlide
            animateIn="fadeInRight"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list.map((item, index) => {
              if (index >= 3) {
                return (
                  <ImageWrapper maintenance={item.status != 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <GirlImage
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/live/" +
                        item.abbreviation.toLowerCase() +
                        (item.abbreviation.toLowerCase() === "wgfm" ||
                        item.abbreviation.toLowerCase() === "wgvia"
                          ? "-" + i18n.language
                          : "") +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.abbreviation, item.type);
                      }}
                    />
                  </ImageWrapper>
                );
              }
            })}
          </RightSlide>
        </ItemContainer>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LiveGame);
