import React from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";

const SpecialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const GameListItem = styled.div`
  display: flex;
  margin: 20px 20px 0px 20px
  align-items: center;
  position: relative;
  justify-content: center;
`;

const GameListName = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  font-size: 32px;
  margin-top: -20px;
  text-align: center;
`;

const CustomSize = styled.img`
  height: 144px;
  zoom: 2;
`;

const Template4 = ({
  homePageGameList,
  gameMenu,
  shiftScene,
  changeShowGame,
  template,
}) => {
  return (
    <div>
      <GameLister>
        {gameMenu
          .filter(
            //filter with available game from homepagegamelist
            (item) =>
              homePageGameList
                .map((item) => item.type)
                .filter((value, index, self) => self.indexOf(value) === index)
                .indexOf(item.type[0]) >= 0
          )
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
              <SpecialContainer>
                <GameListItem
                  onClick={() => {
                    shiftScene(2, i.type);
                    changeShowGame(i.type);
                  }}
                >
                  <CustomSize
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/home/T${template}/${i.image}.png`
                    }
                  />
                </GameListItem>
                <GameListName>{i.title}</GameListName>
              </SpecialContainer>
            );
          })}
      </GameLister>
    </div>
  );
};

export default Template4;
