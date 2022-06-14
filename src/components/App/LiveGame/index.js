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
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcGamePage/live/background.jpg"})
    no-repeat center;
`;

const LeftSlide = styled(ScrollAnimation)`
  display: flex;
`;

const ItemContainer = styled.div`
  position: absolute;
  left: 22%;
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

const TheSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

const TheSelector = styled.div`
  background: ${({ selected }) => {
    return selected
      ? "linear-gradient(101deg, rgba(252,195,111,1) 21%, rgba(252,203,119,0.7) 100%)"
      : " linear-gradient(101deg, rgba(139,202,207,1) 21%, rgba(133,196,200,0.7) 100%)";
  }};
  border-radius: 12px;
  padding: 10px 20px;
  min-width: 200px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: all 10s linear;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 3px;

  ${({ selected }) => {
    return (
      !selected &&
      ` :hover {
      background: linear-gradient(
        101deg,
        rgba(252, 195, 111, 0.75) 21%,
        rgba(252, 203, 119, 0.75) 100%
      );
    }`
    );
  }};
`;

const CustomChevron = styled.div`
  width: 15px;
  height: 15px;
  background-color: #fff;
  mask: url(${process.env.PUBLIC_URL + `/assets/images/misc/arrow-right.png`})
    no-repeat center / contain;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 100px;
`;

const JoinButton = styled.div`
  margin-top: 20px;
  border-radius: 50px;
  padding: 10px 30px;
  background: linear-gradient(
    101deg,
    rgba(252, 215, 132, 1) 21%,
    rgba(252, 190, 105, 1) 100%
  );
  font-weight: bold;
  color: rgba(0, 0, 0, 0.75);
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
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
      selected: liveList[0] && liveList[0].abbreviation,
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
        selected: liveList[0].abbreviation,
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
        <ItemContainer style={{ marginTop: 100 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <TheSelectorContainer>
              {this.state.list.map((item, index) => {
                return (
                  <TheSelector
                    maintenance={item.status !== 0}
                    key={index}
                    selected={this.state.selected === item.abbreviation}
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        selected: item.abbreviation,
                      });
                    }}
                  >
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <CustomChevron />
                    <div> {i18n.t(`${item.abbreviation}.live`)}</div>
                  </TheSelector>
                );
              })}
              <JoinButton>
                <div>{i18n.t("common.joinGame")}</div>
              </JoinButton>
            </TheSelectorContainer>
          </LeftSlide>
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
