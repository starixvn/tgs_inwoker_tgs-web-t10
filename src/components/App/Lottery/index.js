import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import ScrollAnimation from "react-animate-on-scroll";

import i18n from "../../../utils/i18n";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 870px;
  padding: 70px 0px;
  position: relative;
  background: url(${process.env.PUBLIC_URL}/assets/images/pcGamePage/lottery/background.jpg)
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

class Lottery extends Component {
  constructor(props) {
    super(props);
    var lotteryList = this.getLotteryGame();
    this.state = {
      selected: lotteryList[0],
      subMenu: null,
      loaded: false,
      hide: true,
      list: lotteryList,
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
      var lotteryList = this.getLotteryGame();

      this.setState({
        ...this.state,
        selected: lotteryList[0],

        list: lotteryList,
      });
    }
  }
  getLotteryGame = () => {
    var lotteryList = this.props.game.homePageGameList.filter((item) => {
      return (
        item.type === GameTypeEnum.LOTTERY ||
        item.type === GameTypeEnum.LOTTERYLOBBY
      );
    });
    var newLotteryList = [];
    var existList = [];
    for (var i = 0; i < lotteryList.length; i++) {
      if (existList.indexOf(lotteryList[i].abbreviation) < 0) {
        existList.push(lotteryList[i].abbreviation);
        newLotteryList.push(lotteryList[i]);
      }
    }
    return newLotteryList;
  };
  handleJoinGameClick = (name) => {
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      var win = window.open(
        "/" + i18n.language + "/joinlottery/" + name,
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
      <Container>
        <ItemContainer style={{ marginTop: 500 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list.map((item, index) => {
              return (
                <ImageWrapper maintenance={item.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GirlImage
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/lottery/" +
                      item.abbreviation.toLowerCase() +
                      ".png"
                    }
                    onClick={() => {
                      this.handleJoinGameClick(item.abbreviation);
                    }}
                  />
                </ImageWrapper>
              );
            })}
          </LeftSlide>
        </ItemContainer>
        {
          //    <ItemContainer style={{ marginTop: 560 }}>
          //    <RightSlide
          //      animateIn="fadeInRight"
          //      duration={1}
          //      animateOnce={true}
          //      style={{ overflow: "visible" }}
          //    >
          //      {this.state.list.map((item, index) => {
          //        if (index >= 3) {
          //          return (
          //            <GirlImage
          //              style={{ float: "left" }}
          //              img={
          //                process.env.PUBLIC_URL +
          //                "/assets/images/pcGamePage/lottery/" +
          //                item.abbreviation.toLowerCase() +
          //                ".png"
          //              }
          //              onClick={() => {
          //                this.handleJoinGameClick(item.abbreviation, item.type);
          //              }}
          //            />
          //          );
          //        }
          //      })}
          //    </RightSlide>
          //  </ItemContainer>
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
export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
