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
  display: block;
  width: 100%;

  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
  height: 335px;
`

const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-start-gam2.png`})
    no-repeat;
  background-size: 100%;
  margin: 165px 100px 0px 88px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: #fff;
  zoom: 1.3;
`

const GameTypeButtonWrapper = styled.div`
  display: -webkit-box;
  width: 100%;
  overflow: auto;
  margin-bottom: 20px;
`

const GameTypeButton = styled.div`
  ${({ selected }) => {
    return selected ? `color: #46A3FF;` : `color: #fff;`
  }}
  font-size: 28px;
  height: 75px;
  background: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: auto;
  padding: 0px 20px;
`

const GameMenu = styled.div``

const GameImageWrapper = styled.div`
  background: #0080ff;
  padding: 2.5px 0px;
  margin: 10px 10px 10px 0px;

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
        filter: brightness(15%) grayscale(200%);
      }
      ${Maintenance}{
        display: flex;
    
    }`
      : ``
  }}
`
const Template7 = ({
  changeShowGame,
  listOfGame,
  getImgPrefix,
  handleGameClick,
  gameMenu,

  selected
}) => {
  var selectedGame = [selected]
  return (
    <div style={{ paddingTop: 150 }}>
      <GameMenu>
        <GameTypeButtonWrapper>
          {gameMenu
            .sort((a, b) => {
              return selectedGame.indexOf(b.type) - selectedGame.indexOf(a.type)
            })
            .map((data) => {
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
        </GameTypeButtonWrapper>
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
            })
            .map((row, index) => {
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

export default Template7
