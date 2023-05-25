import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import i18n from "../../../utils/i18n";
import ScrollAnimation from "react-animate-on-scroll";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import Common from "../../../utils/Common";
const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 850px;
  padding: 70px 0px;
  position: relative;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcGamePage/esports/background.jpg"})
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
  background: ${({ theme }) => theme.body};
  opacity: 0.8;

  ${TopLiner} {
    background: ${({ theme }) => theme.body};
    ::before {
      background: ${({ theme }) => theme.body};
    }
    ::after {
      background: ${({ theme }) => theme.body};
    }
  }

  ${BottomLiner} {
    background: ${({ theme }) => theme.body};
    opacity: 0.9;
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

class ESports extends Component {
  constructor(props) {
    super(props);
    var sportsList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.ESPORTS;
    });

    this.state = {
      selected: sportsList[0] && sportsList[0].abbreviation,
      list: sportsList,
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
      var sportsList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.ESPORTS;
      });

      this.setState({
        ...this.state,
        selected: sportsList[0] && sportsList[0].abbreviation,

        list: sportsList,
      });
    }
  }
  handleJoinGameClick = (params) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      Common.closePreviousPopup();
      this.props.performBalanceRefresh();
      this.props.history.push(
        "/sports/play/" + params + "/" + GameTypeEnum.ESPORTS
      );
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
                    onClick={() => {
                      this.handleJoinGameClick(item.abbreviation);
                    }}
                  >
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <CustomLogoHolder
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/provider/white/" +
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
)(withRouter(ESports));
