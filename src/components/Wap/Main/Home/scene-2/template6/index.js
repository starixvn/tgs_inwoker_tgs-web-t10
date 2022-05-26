import React from 'react'
import styled from 'styled-components'
import i18n from '../../../../../../utils/i18n'
import config from "../../../../../../config/config";

const BackButton = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 24px;
  padding: 10px 20px;
`

const GameButtonWrapper = styled.div``

const GameFrameImg = styled.div`
  margin: 0 auto 10px auto;
  display: block;
  width: 100%;
  height: 250px;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
`

const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-start-gam2.png`})
    no-repeat;
  background-size: 100%;
  margin: 130px 100px 0px 50px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: #fff;
  zoom: 1.3;
`

const GameTypeButton = styled.div`
  ${({ selected }) => {
    return selected
      ? `background: #007CF8;`
      : `background: #BBDDFF; border: solid 5px #007CF8; `
  }};
  font-size: 28px;
  color: #001953;
  height: 75px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 10px;

  :first-child {
    margin-top: 0px;
  }
`

const GameMenu = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
`

const GameImageWrapper = styled.div`
  background: #0080ff;
  padding: 2.5px 5px;
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  :first-child {
    margin-top: 0px;
  }
`

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
`

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
      : ``
  }}
`

const Template6 = ({
  shiftScene,
  changeShowGame,
  listOfGame,
  getImgPrefix,
  handleGameClick,
  gameMenu,

  selected
}) => {
  return (
    <div style={{ paddingTop: 150 }}>
      <GameMenu>
        <div>
          {gameMenu.map((data) => {
            return (
              <GameTypeButton
                onClick={() => {
                  changeShowGame(data.type)
                }}
                selected={data.type === selected}
              >
                {data.title}
              </GameTypeButton>
            )
          })}
        </div>
        <div>
          {(() => {
            var currentType = -1
            return listOfGame
            .sort((a, b) => {
              if (config.features.LiveGame_Sorting_SKY) {
                var sortDGFirst = ["DG"];
                return (
                  sortDGFirst.indexOf(b.abbreviation) -
                  sortDGFirst.indexOf(a.abbreviation)
                );
              } else return b - a;
            }).map((row, index) => {
              var jsx = (
                <GameImageWrapper>
                  <GameButtonWrapper>
                    <NewWrapper maintenance={row.status != 0}>
                      <Maintenance>
                        {i18n.t('transfer.maintenance')}
                      </Maintenance>
                      <GameFrameImg
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/wapGame/T3T4/${getImgPrefix(
                          row.type
                        )}-${row.abbreviation.toLowerCase()}.jpg`}
                        key={index}
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
                          {i18n.t('common.startGame')}
                        </ButtonStartGame>
                      </GameFrameImg>
                    </NewWrapper>
                  </GameButtonWrapper>
                </GameImageWrapper>
              )
              currentType = row.type
              return jsx
            })
          })()}
        </div>
      </GameMenu>
    </div>
  )
}

export default Template6
