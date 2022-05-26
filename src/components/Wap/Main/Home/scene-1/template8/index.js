import i18next from "i18next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";

const TheContainer = styled.div`
  padding: 0px 20px;
`;

const GameLister = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  border-radius: 20px;
  background: ${({ theme }) => theme.gamelisterBg};
  margin-bottom: 15px;
  border: ${({ theme }) => theme.gamelisterBorder};
`;

const CustomImageWrapper = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const TheText = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.gamelisterOriginalText};
`;

const CustomImageResizer = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.gamelisterOriginalColor};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/home/T8/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const GameListItem = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px;
  justify-content: center;
  ${({ selected, theme }) => {
    return selected
      ? `
      background:${theme.gamelisterSelectedButton};
      border: ${theme.gamelisterBorder};

      ${CustomImageResizer}{
        background:${theme.gamelisterSelectedIcon};
      }

    ${TheText}{
      color: ${theme.gamelisterSelectedText};
    }
    `
      : "";
  }};
  border-radius: 20px;
`;

const GameButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

const GameFrameImg = styled.div`
  margin: 0 auto 10px auto;
  display: block;
  width: 100%;
  height: 240px;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: cover;
`;

const GMOGameFrameImg = styled(GameFrameImg)`
  height: 306px;
  border: ${({ theme }) => theme.gamelisterBorder};
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
`;

const ButtonGradientWrapper = styled.div``;

const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-start-game-T8GMO.png`})
    no-repeat;
  background-size: 100%;
  margin: 155px 0 0 76px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  padding-top: 6px;
  color: #fff;
  zoom: 1.3;
`;

const NewWrapper = styled.div`
  position: relative;

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg}{
        filter: brightness(20%) grayscale(200%);
      }
      ${Maintenance}{
        display: flex;
    
    }`
      : ``;
  }}
`;

const Template8 = ({
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected === "") {
      setSelected(gameMenu2[0].type);
    }
  }, []);

  var currentType = -1;

  const switchVariant = (brand, row) => {
    switch (brand) {
      case "GMO":
        return (
          <GameButtonWrapper>
            <ButtonGradientWrapper>
              <NewWrapper maintenance={row.status != 0}>
                <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                <GMOGameFrameImg
                  src={`${
                    process.env.PUBLIC_URL
                  }/assets/images/wapGame/T8GMO/${getImgPrefix(
                    row.type
                  )}-${row.abbreviation.toLowerCase()}.jpg`}
                  id={
                    currentType !== row.type
                      ? `gameType${row.type}`
                      : `gameId${row.id}`
                  }
                  onClick={() =>
                    handleGameClick(
                      row.type,
                      row.abbreviation,
                      row.game_platform_id
                    )
                  }
                >
                  <ButtonStartGame>
                    {i18n.t("common.startGame")}
                  </ButtonStartGame>
                </GMOGameFrameImg>
              </NewWrapper>
            </ButtonGradientWrapper>
          </GameButtonWrapper>
        );
      default:
        return (
          <GameButtonWrapper>
            <NewWrapper maintenance={row.status != 0}>
              <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
              <GameFrameImg
                src={`${
                  process.env.PUBLIC_URL
                }/assets/images/wapGame/T8/${getImgPrefix(
                  row.type
                )}-${row.abbreviation.toLowerCase()}.jpg`}
                id={
                  currentType !== row.type
                    ? `gameType${row.type}`
                    : `gameId${row.id}`
                }
                onClick={() =>
                  handleGameClick(
                    row.type,
                    row.abbreviation,
                    row.game_platform_id
                  )
                }
              ></GameFrameImg>
            </NewWrapper>
          </GameButtonWrapper>
        );
    }
  };

  return (
    <TheContainer>
      <GameLister>
        {gameMenu2
          .sort((a, b) => {
            if (config.features.MenuItem_Sorting_HK28) {
              return a.sortingHK28 > b.sortingHK28 ? 1 : -1;
            } else if (config.features.MenuItem_Sorting_WLGHK) {
              return a.sortingWLGHK > b.sortingWLGHK ? 1 : -1;
            } else if (config.features.MenuItem_Sorting_SKY) {
              return a.sortingSKY > b.sortingSKY ? 1 : -1;
            } else if (config.features.MenuItem_Sorting_PB) {
              return a.sortingPB > b.sortingPB ? 1 : -1;
            } else if (config.features.MenuItem_Sorting_GMO) {
              return a.sortingGMO > b.sortingGMO ? 1 : -1;
            } else {
              return a.sorting > b.sorting ? 1 : -1;
            }
          })
          .map((i, index) => {
            return (
              <GameListItem
                selected={selected === i.type}
                onClick={() => {
                  changeShowGame(i.type);
                  setSelected(i.type);
                }}
              >
                <CustomImageWrapper>
                  <CustomImageResizer icon={i.image} />
                </CustomImageWrapper>
                <TheText>{i.title}</TheText>
              </GameListItem>
            );
          })}
      </GameLister>
      <div>
        {(() => {
          return homePageGameList
            .sort((a, b) => {
              if (config.features.LiveGame_Sorting_SKY) {
                var sortDGFirst = ["DG"];
                return (
                  sortDGFirst.indexOf(b.abbreviation) -
                  sortDGFirst.indexOf(a.abbreviation)
                );
              } else return b - a;
            })
            .filter((game) => selected.indexOf(game.type) >= 0)
            .map((row, index) => {
              return switchVariant(config.brand, row);
            });
        })()}
      </div>
    </TheContainer>
  );
};

export default Template8;
