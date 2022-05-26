import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";

const Container = styled.div`
  width: 100%;
  height: auto;

  padding: 0px 0px;
  position: relative;
  min-height: ${(props) =>
    props.GamePage_SpecificBackground ? "900px" : "730px"};
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/qipai/background" +
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

class Qipai extends Component {
  constructor(props) {
    super(props);

    var qipaiList = props.game.homePageGameList.filter((item) => {
      return item.type == GameTypeEnum.QIPAI;
    });

    this.state = {
      selected: qipaiList[0],
      subMenu: null,
      trigger: true,
      list: qipaiList,
      selectedIndex: 0,
      first: true,
    };
  }
  componentDidMount() {
    //test for fake input
  }
  componentDidUpdate(preProps, preStates) {}

  handleJoinGameClick = (kind) => {
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      var win = window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.QIPAILOBBY +
          "/" +
          kind.toUpperCase(),
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

  handleGameChange = (index) => {
    var gameSelected = this.state.list.filter(function (el) {
      return el.id === index;
    });
    this.setState({
      selected: gameSelected[0],
    });
  };

  render() {
    return (
      <Container
        GamePage_SpecificBackground={
          config.features.GamePage_SpecificBackground
        }
      >
        <ItemContainer style={{ marginTop: 500 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.props.game.homePageGameList
              .filter((item) => {
                return item.type == GameTypeEnum.QIPAI;
              })
              .slice(0, 4)
              .reverse()

              .map((item, index) => {
                return (
                  <ImageWrapper maintenance={item.status != 0}>
                    <Maintenance isGameMaintenance={true}>
                      {i18n.t("transfer.maintenance")}
                    </Maintenance>
                    <GirlImage
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/qipai/" +
                        item.abbreviation.toLowerCase() +
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
        {
          //      <ItemContainer style={{ marginTop: 560 }}>
          //      <RightSlide
          //        animateIn="fadeInRight"
          //        duration={1}
          //        animateOnce={true}
          //        style={{ overflow: "visible" }}
          //      >
          //        {this.state.list.map((item, index) => {
          //          if (index >= 3) {
          //            return (
          //              <GirlImage
          //                style={{ float: "left" }}
          //                img={
          //                  process.env.PUBLIC_URL +
          //                  "/assets/images/pcGamePage/lottery/" +
          //                  item.abbreviation.toLowerCase() +
          //                  ".png"
          //                }
          //                onClick={() => {
          //                  this.handleJoinGameClick(item.abbreviation, item.type);
          //                }}
          //              />
          //            );
          //          }
          //        })}
          //      </RightSlide>
          //    </ItemContainer>
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Qipai);
