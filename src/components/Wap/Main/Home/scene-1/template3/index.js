import i18next from "i18next";
import React from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const GameListItem = styled.div`
  margin: 20px;
  display: flex;
  align-items: flex-end;
  position: relative;
  justify-content: center;
`;

const GameListName = styled.div`
  position: absolute;
  font-size: 50px;
  color: white;
  font-weight: bold;
  width: 220px;
  ${({ big }) => {
    return big
      ? `
      right: 25px;
      bottom: 25px;
      text-align: right;
        `
      : `
      left: 120px;
      top: 50%;
      transform:translateY(-50%);
       `;
  }};
`;

const CustomImageWrapper = styled.div`
  padding: 0x 10px;
`;
const CustomImageResizer = styled.img`
  width: 100%;
`;

const Template3 = ({
  gameMenu,
  shiftScene,
  changeShowGame,
  template,
  homePageGameList,
}) => {
  const languageSwitcher = (language) => {
    switch (language) {
      case "th-TH":
        return "th-TH";
      default:
        return "en-US";
    }
  };

  return (
    <div>
      <GameLister>
        {gameMenu
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
            var gameList = homePageGameList.filter(
              (game) => i.type.indexOf(game.type) >= 0
            );

            return (
              gameList.length !== 0 && (
                <GameListItem
                  onClick={() => {
                    shiftScene(2, i.type);
                    changeShowGame(i.type);
                  }}
                >
                  {config.features.HomePage_Animated ? (
                    <CustomImageWrapper>
                      <CustomImageResizer
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/home/T${template}/${languageSwitcher(
                            i18next.language
                          )}/${i.image}.png`
                        }
                      />
                    </CustomImageWrapper>
                  ) : (
                    <CustomImageWrapper>
                      <CustomImageResizer
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/home/T${template}/default/${i.image}.png`
                        }
                      />
                      <GameListName big={i.big}>{i.title}</GameListName>
                    </CustomImageWrapper>
                  )}
                </GameListItem>
              )
            );
          })}
      </GameLister>
    </div>
  );
};

export default Template3;
