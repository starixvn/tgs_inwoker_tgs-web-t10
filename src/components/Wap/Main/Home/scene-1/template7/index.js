import React from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto;
`;

const GameListItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  margin-bottom: 20px;
`;

const GameListName = styled.div`
  position: absolute;
  font-size: 60px;
  color: #fff;
  font-weight: bold;
  left: 80px;
  bottom: 70px;
`;

const Images = styled.img`
  zoom: 1.8;
`;

const Template7 = ({ gameMenu, shiftScene, changeShowGame, template }) => {
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
                <Images
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/home/T${template}/${i.image}.jpg`
                  }
                />
                <GameListName>{i.title}</GameListName>
              </GameListItem>
            );
          })}
      </GameLister>
    </div>
  );
};

export default Template7;
