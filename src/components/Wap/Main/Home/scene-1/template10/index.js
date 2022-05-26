import React, { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";

const TheContainer = styled.div``;

const GameLister = styled.div`
  display: -webkit-box;
  background: #fff;
  justify-content: space-around;
  border-radius: 8px;
  overflow: auto;
  padding: 0px 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-bottom: 25px;
  border: ${({ theme }) => theme.gamelisterBorder};

  ::-webkit-scrollbar {
    display: none;
  }
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

const Dot = styled.div`
  height: 80%;
  width: 80%;
  border-radius: 20px;
  position: absolute;
  background: #49bbc5;
  zindex: 0;
  display: none;
`;

const Arrow = styled.div`
  position: absolute;

  bottom: -2px;
  left: 45%;
  border-top: 10px solid #49bbc5;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  display: none;
`;

const ListerWrapper = styled.div`
  ${({ selected }) => {
    return selected
      ? `
      ${Arrow} {
        display: block;
      }
  `
      : "";
  }};
`;

const GameListItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 20px 10px;
  min-width: 100px;
  justify-content: center;
  ${({ selected, theme }) => {
    return selected
      ? `
      background:linear-gradient(180deg, rgba(68,225,216,1) 21%, rgba(79,180,194,1) 100%);
     color: #fff;
      ${CustomImageResizer}{
        background:${theme.gamelisterSelectedIcon};
      }

      ${Dot}{
        display: block;
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 25px;
`;

const GameFrameImg = styled.div`
  display: block;
  width: 100%;
  height: 150px;
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

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0px 15px;
  grid-gap: 15px 15px;
`;

const Template10 = ({
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
              <ListerWrapper
                style={{ position: "relative", paddingBottom: 5 }}
                selected={selected === i.type}
              >
                <GameListItem
                  selected={selected === i.type}
                  onClick={() => {
                    changeShowGame(i.type);
                    setSelected(i.type);
                  }}
                >
                  <Dot />
                  <TheText style={{ zIndex: 1 }}>{i.title}</TheText>
                </GameListItem>{" "}
                <Arrow />
              </ListerWrapper>
            );
          })}
      </GameLister>
      <GridWrapper>
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
              return (
                <div style={{ padding: 5 }}>
                  <GameButtonWrapper>
                    <NewWrapper maintenance={row.status !== 0}>
                      <Maintenance>
                        {i18n.t("transfer.maintenance")}
                      </Maintenance>
                      <GameFrameImg
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/wapGame/T10/${getImgPrefix(
                          row.type
                        )}-${row.abbreviation.toLowerCase()}.png`}
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
                </div>
              );
            });
        })()}
      </GridWrapper>
    </TheContainer>
  );
};

export default Template10;
