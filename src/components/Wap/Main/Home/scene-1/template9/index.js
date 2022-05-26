import React, { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import MenuVariantOne from "./menu/type1";
import MenuVariantTwo from "./menu/type2";

const TheContainer = styled.div`
  padding: 0px 20px;
`;

const GameButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const GameFrameImg = styled.div`
  display: block;
  width: 100%;
  height: 240px;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: cover;
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

const Template9 = ({
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

  const gameMenuList = gameMenu2.sort((a, b) => {
    if (config.features.MenuItem_Sorting_SKY) {
      return a.sortingSKY > b.sortingSKY ? 1 : -1;
    } else {
      return a.sorting > b.sorting ? 1 : -1;
    }
  });

  const setGames = (type) => {
    changeShowGame(type);
    setSelected(type);
  };

  return (
    <TheContainer>
      {config.features.T9_CustomHome ? (
        <MenuVariantTwo
          selected={selected}
          setGames={setGames}
          gameMenu={gameMenuList}
        />
      ) : (
        <MenuVariantOne
          selected={selected}
          setGames={setGames}
          gameMenu={gameMenuList}
        />
      )}

      <GameButtonWrapper>
        {(() => {
          return homePageGameList
            .filter((game) => selected.indexOf(game.type) >= 0)
            .sort((a, b) => {
              if (config.features.LiveGame_Sorting_SKY) {
                var sortDGFirst = ["DG"];
                return (
                  sortDGFirst.indexOf(b.abbreviation) -
                  sortDGFirst.indexOf(a.abbreviation)
                );
              } else return b - a;
            })
            .map((row, index) => {
              return (
                <NewWrapper maintenance={row.status !== 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GameFrameImg
                    src={`${
                      process.env.PUBLIC_URL
                    }/assets/images/wapGame/T9/${getImgPrefix(
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
              );
            });
        })()}
      </GameButtonWrapper>
    </TheContainer>
  );
};

export default Template9;
