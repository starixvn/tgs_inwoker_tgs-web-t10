import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import { useState } from "react";
import { useEffect } from "react";

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  display: none;
  text-transform: capitalize;
  pointer-events: none;
  font-weight: bold;
  user-select: none;
  cursor: not-allowed;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  font-size: 14px;
`;

const TheSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
  height: 80vh;
  overflow: auto;
  padding-bottom: 500px;

  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const TheSelector = styled.div`
background: ${({ theme, selected }) => {
  return selected
    ? "linear-gradient(to right, rgba(252, 190, 105, 1), rgba(252, 190, 105, 0.7))"
    : `linear-gradient(to right,#53B2B8, rgba(83, 178, 184, 0.7))`;
}};

  transition: all 1s ease-in-out;

  :hover {
    opacity: 1;
  }
  position: relative;
  min-height: 50px;
  border-radius: 8px;
  padding: 10px 20px;
  min-width: 300px;
  max-height: 100px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  position: relative
  align-items: center;
  justify-content: center;

  ${({ maintenance }) => {
    return (
      maintenance &&
      ` pointer-events: none;
      opacity:1;
    
  ${Maintenance} {
  
    display: flex;
  }`
    );
  }}
`;

const JoinGameButton = styled.div`
  background: linear-gradient(to bottom, #fcd784, #fcbe69);
  padding: 20px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  width: fit-content;
`;

const Variant2 = ({ gameList, handleJoinGameClick }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(gameList[0]?.abbreviation);
  }, [gameList]);

  return (
    <TheSelectorContainer>
      {gameList?.map((item, index) => {
        return (
          <TheSelector
            selected={selected === item.abbreviation}
            maintenance={item.status !== 0}
            key={index}
            onClick={() => {
              setSelected(item.abbreviation);
            }}
          >
            <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "Center",
              }}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/pcGamePage/misc/menubutton.svg"
                }
                style={{ height: 18, position: "absolute", top: 2, left: 0 }}
                alt="123"
              />
              <div>{item.name}</div>
            </div>
          </TheSelector>
        );
      })}
      <JoinGameButton
        onClick={() => {
          handleJoinGameClick(selected);
        }}
      >
        <img
          src={
            process.env.PUBLIC_URL +
            "/assets/images/pcGamePage/misc/joingame.svg"
          }
          style={{ height: 20 }}
          alt="joingamebtn"
        />
        <div>{i18n.t("enterGame")}</div>
      </JoinGameButton>
    </TheSelectorContainer>
  );
};

export default Variant2;
