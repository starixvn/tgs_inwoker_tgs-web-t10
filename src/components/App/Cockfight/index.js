import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import i18n from "../../../utils/i18n";
import ScrollAnimation from "react-animate-on-scroll";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import Common from "../../../utils/Common";
import { GameService } from "../../../api-services/services/GameService";
import { AppHistory } from "../../../history/History";
const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 70px 0px;
  position: relative;
  min-height: 850px;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcGamePage/cockfight/background.jpg"})
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
  pointer-events: none;
  font-weight: bold;
  user-select: none;
  cursor: not-allowed;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  font-size: 14px;
`;

const TheSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 500px;
  gap: 12px;
  height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const TopLiner = styled.div`
  height: 4px;
  width: 40%;
  background: ${({ theme }) => theme.gamePageButtonBorderBottom};
  ::before {
    content: "";
    display: block;

    background: ${({ theme }) => theme.gamePageButtonBorderBottom};
    width: 4px;
    height: 6px;
    position: absolute;
    right: 58px;

    z-index: 0;
    transform: rotate(135deg);
  }

  ::after {
    content: "";
    display: block;
    background: ${({ theme }) => theme.gamePageButtonBorderBottom};
    width: 4px;
    height: 6px;
    position: absolute;
    left: 58px;
    transform: rotate(45deg);
    z-index: 0;
  }
`;

const BottomLiner = styled.div`
  width: 100%;
  height: 10px;

  background: ${({ theme }) => theme.gamePageButtonBorderBottom};
`;

const TheBottomLiner = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomLogoHolder = styled.div`
  width: 120px;
  height: 100px;

  background: url(${({ src }) => src}) no-repeat center;
  background-size: contain;
`;

const TheSelector = styled.div`
  background: ${({ theme }) => {
    return theme.useBackgroundColor
      ? theme.homeHeaderBackgroundColor
      : `rgba(${theme.primaryRgb}, 0.6)`;
  }};
  opacity: 0.8;

  ${TopLiner} {
    background: ${({ theme }) => theme.homeHeaderBackgroundColor};
    ::before {
      background: ${({ theme }) => theme.homeHeaderBackgroundColor};
    }
    ::after {
      background: ${({ theme }) => theme.homeHeaderBackgroundColor};
    }
  }

  ${BottomLiner} {
    background: ${({ theme }) => theme.homeHeaderBackgroundColor};
  }

  transition: all 1s ease-in-out;

  :hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    opacity: 1;
    ${TopLiner} {
      background: ${({ theme }) => theme.accent};
      ::before {
        background: ${({ theme }) => theme.accent};
      }
      ::after {
        background: ${({ theme }) => theme.accent};
      }
    }
    ${BottomLiner} {
      background: ${({ theme }) => theme.accent};
    }

    ${CustomLogoHolder} {
      transform: translateY(-10px);
    }
  }
  position: relative;
  min-height: 100px;
  border-radius: 12px;
  padding: 10px 20px;
  min-width: 200px;
  max-height: 100px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ maintenance }) => {
    return (
      maintenance &&
      ` pointer-events: none;
      opacity:1;
    
  ${Maintenance} {
  
    display: flex;
  }`
    );
  }}
`;

class Cockfight extends Component {
  constructor(props) {
    super(props);
    var cockfightList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.COCKFIGHT;
    });

    this.state = {
      selected: cockfightList[0] && cockfightList[0].abbreviation,
      list: cockfightList,
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
      var cockfightList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.COCKFIGHT;
      });

      this.setState({
        ...this.state,
        selected: cockfightList[0] && cockfightList[0].abbreviation,

        list: cockfightList,
      });
    }
  }
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      if (params === "SM01") {
        if (document.getElementById("audio") != null)
          document.getElementById("audio").volume = 0.0;
        this.props.performBalanceRefresh();
        Common.closePreviousPopup();

        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      } else {
        AppHistory.push("/sports/play/" + params + "/" + GameTypeEnum.SPORTS);
      }
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
        <ItemContainer>
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
                    onClick={() => {
                      this.handleJoinGameClick(item.gpcode);
                    }}
                  >
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <CustomLogoHolder
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/provider/" +
                        item.abbreviation.toLowerCase() +
                        ".png"
                      }
                    />

                    <TheBottomLiner>
                      <TopLiner />
                      <BottomLiner />
                    </TheBottomLiner>
                  </TheSelector>
                );
              })}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Cockfight));
