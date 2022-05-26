import React from "react";
import styled from "styled-components";
import Common from "../../../../../../utils/Common";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${({ brand }) => {
      return (
        process.env.PUBLIC_URL +
        `/assets/images/wapp/${
          brand === "WLGHK" ? "wlghk-btn" : "btn-start-game-T1T2"
        }.png`
      );
    }})
    no-repeat;
  background-size: 100%;
  margin: 150px 0 0 76px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: #fff;
  zoom: 1.3;
`;
const GameSelectionContainer = styled.div`
  font-size: 48px;
  position: fixed;
  top: 550px;
  left: 0;
`;
const GameSelectionUL = styled.div`
  position: fixed;
  top: 525px;
  font-size: 35px;
  font-weight: bold;
  color: #cdcdcd;
  margin: 0 0 0 20px;
  background: white;
  width: 98%
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 10px 0px;
  padding: 0 0px;
  width: 176px;
  overflow-y: auto;
  height: calc(100vh - 640px);
`;

const TheIcon = styled.div`
  width: ${(props) => (config.theme.toLowerCase() === "pb" ? "45px" : "60px")};
  height: ${(props) => (config.theme.toLowerCase() === "pb" ? "65px" : "80px")};
  mask: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
  contain;`;
  }};
`;
const GameSelectionLI = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: ${(props) =>
    config.theme.toLowerCase() === "pb"
      ? "35px auto 40px auto"
      : "16px auto 0px auto"};
  text-align: center;
  font-size: 24px;
  line-height: 1.15;
  color: ${({ selected, theme }) => {
    if (config.theme.toLowerCase() === "pb")
      return selected ? theme.secondary : theme.primary;
    else return selected ? theme.primary : theme.secondary;
  }};
  padding: 10px 0px;

  ${TheIcon} {
    background-color: ${({ selected, theme }) => {
      if (config.theme.toLowerCase() === "pb")
        return selected ? theme.secondary : theme.primary;
      else return selected ? theme.primary : theme.secondary;
    }};
  }
`;

const GameListWrap = styled.div`
  width: 560px;
  padding: 0px 20px 0px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.body};
`;
// margin-bottom: 120px;
const GameFrameImg = styled.div`
  margin: 0 auto  ${(props) =>
    config.theme.toLowerCase() === "pb" ? "30px" : "10px"}; auto;
  
  display: block;
  width: 98%;
  height: 320px;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
  position: relative;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.15);
    
`;
const GameName = styled.div`
  color: #fff;
  position: absolute;
  top: 62px;
  left: 20px;
  width: 260px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
`;
const GameListWrap2 = styled(GameListWrap)`
  margin-left: 188px;
  margin-top: 510px;
  padding-top: 10px;
  overflow: auto;
`;

const GameFrameImg2 = styled(GameFrameImg)`
  height: ${(props) =>
    config.theme.toLowerCase() === "pb" ? "220px" : "240px"};
  margin: ${(props) =>
    config.theme.toLowerCase() === "pb"
      ? "5px 10px 30px 10px"
      : "0px 0px 0px 0px"};
`;

const ButtonStartGame2 = styled(ButtonStartGame)`
  margin: ${(props) =>
      config.theme.toLowerCase() === "pb" ? "155px" : "170px"}
    0 0 70px;
  background: url(${({ brand }) => {
      return (
        process.env.PUBLIC_URL +
        `/assets/images/wapp/${
          brand === "WLGHK"
            ? "wlghk-btn"
            : config.theme.toLowerCase() === "pb"
            ? "btn-start-game-T5"
            : "btn-start-game-T1T2"
        }.png`
      );
    }})
    no-repeat center;
  zoom: 1;
  color: #fff;
  background-size: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 520px;
  height: 240px;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
`;

const NewWrapper = styled.div`
  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg2}{
        filter: brightness(40%) grayscale(200%);
      }
      ${Maintenance}{
        display: flex;
    
    }`
      : ``;
  }}
`;

// to prevent scrolling issue
const EmptyWrapper = styled.div`
  height: 10px;
`;

var sortingHK28 = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.FISH,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.LOTTERYLOBBY,
];

var sortingSKY = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.LOTTERYLOBBY,
];

var sortingPB = [
  GameTypeEnum.SLOT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.QIPAILOBBY,
];

var sortingWLGHK = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
];

var sortingGMO = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.SPORTS,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.SLOT,
];

const Template2 = ({
  gameTypeListSorting,
  homePageGameList,
  getImgPrefix,
  selectedGameType,
  convertGameTypeToText,
  handleGameTypeClick,
  handleGameClick,
  scrollRef,
  getBannerTemplate,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <GameSelectionContainer>
        <GameSelectionUL ref={scrollRef}>
          {(() => {
            return gameTypeListSorting.map((type, index) => {
              return (
                <GameSelectionLI
                  style={
                    i18n.language === "en-US"
                      ? {
                          fontSize:
                            config.theme.toLowerCase() === "pb"
                              ? "24px"
                              : "29px",
                          paddingTop: "6px",
                        }
                      : {}
                  }
                  key={index}
                  selected={selectedGameType === type}
                  onClick={() => handleGameTypeClick(type)}
                >
                  <TheIcon
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapGame/icon/${type}.svg`
                    }
                  />
                  <div> {convertGameTypeToText(type)}</div>
                </GameSelectionLI>
              );
            });
          })()}
        </GameSelectionUL>
      </GameSelectionContainer>
      <GameListWrap2>
        {(() => {
          var displayGameType = Common.GetDisplayGameType();
          var currentType = -1;
          return homePageGameList
            .filter((a) => displayGameType.indexOf(a.type) >= 0)
            .sort((a, b) => {
              if (config.features.LiveGame_Sorting_SKY) {
                var sortDGFirst = ["DG"];
                return (
                  sortDGFirst.indexOf(b.abbreviation) -
                  sortDGFirst.indexOf(a.abbreviation)
                );
              } else return b - a;
            })
            .sort(function (a, b) {
              if (config.features.MenuItem_Sorting_HK28)
                return (
                  sortingHK28.indexOf(a.type) - sortingHK28.indexOf(b.type)
                );
              else if (config.features.MenuItem_Sorting_WLGHK)
                return (
                  sortingWLGHK.indexOf(a.type) - sortingWLGHK.indexOf(b.type)
                );
              else if (config.features.MenuItem_Sorting_SKY)
                return sortingSKY.indexOf(a.type) - sortingSKY.indexOf(b.type);
              else if (config.features.MenuItem_Sorting_PB)
                return sortingPB.indexOf(a.type) - sortingPB.indexOf(b.type);
              else if (config.features.MenuItem_Sorting_GMO)
                return sortingGMO.indexOf(a.type) - sortingGMO.indexOf(b.type);
              else return a.type - b.type;
            })
            .map((row, index) => {
              var gameCode = row.abbreviation.toLowerCase();
              var jsx = (
                <NewWrapper maintenance={row.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GameFrameImg2
                    src={`${
                      process.env.PUBLIC_URL
                    }/assets/images/wapGame/${getBannerTemplate(
                      "T1T2"
                    )}/${getImgPrefix(row.type)}-${gameCode}${
                      (gameCode === "wgvia" || gameCode === "wgfm") &&
                      config.features.SportsHideLogo
                        ? "-hkjp"
                        : ""
                    }.jpg`}
                    key={index}
                    id={
                      currentType !== row.type
                        ? `gameType${row.type}`
                        : `gameId${row.abbreviation + row.type}`
                    }
                    onClick={() =>
                      handleGameClick(
                        row.type,
                        row.abbreviation,
                        row.game_platform_id
                      )
                    }
                  >
                    {(() => {
                      if (config.features.SportsHideLogo) {
                        if (gameCode === "wgvia") {
                          return (
                            <GameName index={index}>
                              {i18n.t("common.horserace")}
                            </GameName>
                          );
                        } else if (gameCode === "wgfm") {
                          return (
                            <GameName index={index}>
                              {i18n.t("common.sport")}
                            </GameName>
                          );
                        }
                      }
                    })()}
                    <ButtonStartGame2 brand={config.brand}>
                      {i18n.t("common.startGame")}
                    </ButtonStartGame2>
                  </GameFrameImg2>
                </NewWrapper>
              );
              currentType = row.type;
              return jsx;
            });
        })()}
        <EmptyWrapper></EmptyWrapper>
      </GameListWrap2>
    </div>
  );
};

export default Template2;
