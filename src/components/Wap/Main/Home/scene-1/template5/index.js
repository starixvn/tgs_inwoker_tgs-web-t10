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
  align-items: center;
  position: relative;
  justify-content: center;
`;

const GameListName = styled.div`
  position: absolute;
  font-size: 50px;
  color: #243648;
  font-weight: bold;
  ${({ big }) => {
    return big
      ? `
      right: 25px;
      bottom: 25px;
      text-align: right;
        `
      : `
      left: 110px;
      bottom: 44px;  
       `;
  }};
`;

const Template5 = ({ gameMenu, shiftScene, changeShowGame, template }) => {
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
            return (
              <GameListItem
                onClick={() => {
                  shiftScene(2, i.type);
                  changeShowGame(i.type);
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/home/T${template}/${i.image}.png`
                  }
                />
                <GameListName big={i.big}>{i.title}</GameListName>
              </GameListItem>
            );
          })}
      </GameLister>
    </div>
  );
};

export default Template5;
