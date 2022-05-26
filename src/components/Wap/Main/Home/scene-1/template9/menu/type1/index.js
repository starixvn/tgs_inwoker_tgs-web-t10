import React from "react";
import styled from "styled-components";
import config from "../../../../../../../../config/config";

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

const MenuVariantOne = ({ selected, setGames, gameMenu }) => {
  return (
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
        .map((data, index) => {
          return (
            <GameListItem
              selected={selected === data.type}
              onClick={() => {
                setGames(data.type);
              }}
            >
              <CustomImageWrapper>
                <CustomImageResizer icon={data.image} />
              </CustomImageWrapper>
              <TheText>{data.title}</TheText>
            </GameListItem>
          );
        })}
    </GameLister>
  );
};

export default MenuVariantOne;
