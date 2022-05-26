import React from 'react'
import styled from 'styled-components'
import i18n from '../../../../../../utils/i18n'
import config from "../../../../../../config/config";

const BackButton = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 24px;
  padding: 10px 20px;
`

const GameButtonWrapper = styled.div`
  padding: 10px 20px;
`

const GameFrameImg = styled.div`
  margin: 0 auto 10px auto;
  display: block;
  width: 100%;
  height: 320px;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`

const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-start-game-T5.png`})
    no-repeat;
  background-size: 100%;
  margin: 150px 0 0 76px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: #fff;
  zoom: 1.3;
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
const Template5 = ({
  shiftScene,
  changeShowGame,
  listOfGame,
  getImgPrefix,
  handleGameClick
}) => {
  return (
    <div style={{ paddingTop: 130 }}>
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
            <GameButtonWrapper>
              <NewWrapper maintenance={row.status != 0}>
                <Maintenance>
                  {i18n.t('transfer.maintenance')}
                </Maintenance>
                <GameFrameImg
                  src={`${
                    process.env.PUBLIC_URL
                  }/assets/images/wapGame/T5/${getImgPrefix(
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
          )
          currentType = row.type
          return jsx
        })
      })()}
    </div>
  )
}

export default Template5
