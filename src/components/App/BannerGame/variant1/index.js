import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";

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

const TopLiner = styled.div`
  height: 4px;
  width: 40%;
  background: ${({ theme }) => theme.gamePageButtonBorderBottom};
  ::before {
    content: "";
    display: block;

    background: ${({ theme }) => theme.gamePageButtonBorderBottom};
    width: 4px;
    height: 6px;
    position: absolute;
    right: 58px;

    z-index: 0;
    transform: rotate(135deg);
  }

  ::after {
    content: "";
    display: block;
    background: ${({ theme }) => theme.gamePageButtonBorderBottom};
    width: 4px;
    height: 6px;
    position: absolute;
    left: 58px;
    transform: rotate(45deg);
    z-index: 0;
  }
`;

const BottomLiner = styled.div`
  width: 100%;
  height: 10px;

  background: ${({ theme }) => theme.gamePageButtonBorderBottom};
`;

const TheBottomLiner = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomLogoHolder = styled.div`
  width: 120px;
  height: 100px;

  background: url(${({ src }) => src}) no-repeat center;
  background-size: contain;
`;

const TheSelector = styled.div`
  background: ${({ theme }) => {
    return theme.useBackgroundColor
      ? theme.homeHeaderBackgroundColor
      : `rgba(${theme.primaryRgb}, 0.6)`;
  }};
  opacity: 0.8;

  ${TopLiner} {
    background: ${({ theme }) => theme.homeHeaderBackgroundColor};
    ::before {
      background: ${({ theme }) => theme.homeHeaderBackgroundColor};
    }
    ::after {
      background: ${({ theme }) => theme.homeHeaderBackgroundColor};
    }
  }

  ${BottomLiner} {
    background: ${({ theme }) => theme.homeHeaderBackgroundColor};
  }

  transition: all 1s ease-in-out;

  :hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    opacity: 1;
    ${TopLiner} {
      background: ${({ theme }) => theme.accent};
      ::before {
        background: ${({ theme }) => theme.accent};
      }
      ::after {
        background: ${({ theme }) => theme.accent};
      }
    }
    ${BottomLiner} {
      background: ${({ theme }) => theme.accent};
    }

    ${CustomLogoHolder} {
      transform: translateY(-10px);
    }
  }
  position: relative;
  min-height: 100px;
  border-radius: 12px;
  padding: 10px 20px;
  min-width: 200px;
  max-height: 100px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  display: flex;
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

const Variant1 = ({ gameList, handleJoinGameClick }) => {
  return (
    <TheSelectorContainer>
      {gameList?.map((item, index) => {
        return (
          <TheSelector
            maintenance={item.status !== 0}
            key={index}
            onClick={() => {
              handleJoinGameClick(item.abbreviation);
            }}
          >
            <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
            <CustomLogoHolder
              src={
                process.env.PUBLIC_URL +
                "/assets/images/provider/" +
                item.abbreviation.toLowerCase() +
                ".png"
              }
            />
            <TheBottomLiner>
              <TopLiner />
              <BottomLiner />
            </TheBottomLiner>
          </TheSelector>
        );
      })}
    </TheSelectorContainer>
  );
};

export default Variant1;
