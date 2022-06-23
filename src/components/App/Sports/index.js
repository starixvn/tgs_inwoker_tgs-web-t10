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
  padding: 70px 0px;
  position: relative;
  min-height: 850px;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcGamePage/sports/background.jpg"})
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
  position: relative;
  border-radius: 12px;
  padding: 10px 20px;
  min-width: 200px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: all 10s linear;

  ${({ maintenance }) => {
    return (
      maintenance &&
      ` pointer-events: none;
    
  ${Maintenance} {
    margin-left: -20px;
    display: flex;
  }`
    );
  }}

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

class Sports extends Component {
  constructor(props) {
    super(props);
    var sportsList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.SPORTS;
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
        return item.type === GameTypeEnum.SPORTS;
      });

      this.setState({
        ...this.state,
        selected: sportsList[0] && sportsList[0].abbreviation,

        list: sportsList,
      });
    }
  }
  handleJoinGameClick = (params, type) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      Common.closePreviousPopup();
      if (type === GameTypeEnum.RNGSPORTS) {
        this.props.history.push("/" + i18n.language + "/sports/" + params);
      } else if (params === "WGFM" || params === "WGVIA") {
        if (document.getElementById("audio") != null)
          document.getElementById("audio").volume = 0.0;
        Common.PopupCenter(
          `/${i18n.language}/joinlobbygame/${type}/${params}`,
          params,
          1280,
          720
        );
        this.props.performBalanceRefresh();
      } else {
        this.props.history.push(
          "/" + i18n.language + "/sports/play/" + params + "/" + type
        );
      }
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
                    <div>{i18n.t(`${item.abbreviation}.sports`)}</div>
                  </TheSelector>
                );
              })}
              <JoinButton
                onClick={() => {
                  this.handleJoinGameClick(this.state.selected);
                }}
              >
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sports));
