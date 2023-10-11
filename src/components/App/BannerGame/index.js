import React from "react";
import { connect } from "react-redux";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import styled from "styled-components";
import config from "../../../config/config";
import ScrollAnimation from "react-animate-on-scroll";
import i18n from "../../../utils/i18n";
import { useState } from "react";
import { useEffect } from "react";
import Common from "../../../utils/Common";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { GameService } from "../../../api-services/services/GameService";
import { AppHistory } from "../../../history/History";
import Variant1 from "./variant1";
import Variant2 from "./variant2";

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

  gap: 12px;
  height: 80vh;
  overflow: auto;
  padding-bottom: 500px;

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

const BannerGame = ({
  gameType,
  game,
  account,
  performBalanceRefresh,
  showLogin,
}) => {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const results = game.homePageGameList.filter((item) => {
      if (
        gameType === GameTypeEnum.SPORTS ||
        gameType === GameTypeEnum.RNGSPORTS
      ) {
        return (
          item.type === GameTypeEnum.SPORTS ||
          (item.type === GameTypeEnum.RNGSPORTS && item.abbreviation === "PPTF")
        );
      } else {
        return item.type === gameType;
      }
    });

    if (results.length) {
      setGameList(results);
    }
  }, [game.homePageGameList, gameType]);

  const handleJoinGameClick = (params) => {
    if (account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      Common.closePreviousPopup();
      performBalanceRefresh();

      if (gameType === GameTypeEnum.SPORTS) {
        AppHistory.push("/sports/play/" + params + "/" + gameType);
      } else if (
        params === "WGFM" ||
        params === "WGVIA" ||
        params === "9WCRICKET"
      ) {
        Common.PopupCenter(
          `/joinlobbygame/${gameType}/${params}`,
          params,
          1280,
          720
        );
        this.props.performBalanceRefresh();
      } else if (gameType === GameTypeEnum.RNGSPORTS) {
        this.props.history.push("/sports/" + params);
      } else if (gameType === GameTypeEnum.COCKFIGHT) {
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
        }
      } else {
        var win = Common.PopupCenter(
          "/joingame/" + gameType + "/" + params.toUpperCase(),
          params.toUpperCase(),
          1280,
          720
        );

        var timer = setInterval(function () {
          if (win.closed) {
            clearInterval(timer);
            if (document.getElementById("audio") != null)
              document.getElementById("audio").volume = 1.0;
          }
        }, 1000);
      }
    } else {
      showLogin(true);
    }
  };

  const commonprops = {
    gameList,
    handleJoinGameClick,
  };

  const variantSwitcher = (variant) => {
    switch (variant) {
      case 2:
        return <Variant2 {...commonprops} />;
      default:
        return <Variant1 {...commonprops} />;
    }
  };

  return (
    <Container
      GamePage_SpecificBackground={config.features.GamePage_SpecificBackground}
    >
      <ItemContainer>
        <LeftSlide
          animateIn="fadeInLeft"
          duration={1}
          animateOnce={true}
          style={{ overflow: "visible" }}
        >
          {variantSwitcher(2)}
        </LeftSlide>
      </ItemContainer>
    </Container>
  );
};

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
export default connect(mapStateToProps, mapDispatchToProps)(BannerGame);
