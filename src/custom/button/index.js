import React from "react";
import styled from "styled-components";
import ButtonPNG from "../../assets/images/new/button.png";
import ButtonHoverPNG from "../../assets/images/new/button-hover.png";
import Button2PNG from "../../assets/images/new/button2.png";
import Button2HoverPNG from "../../assets/images/new/button2-hover.png";

const variantSwitcher = (variant, active) => {
  switch (variant) {
    case "1":
      return `
      background: url(${active ? ButtonHoverPNG : ButtonPNG})
      no-repeat center; 
      width: 222px;
      :hover {
        background: url(${ButtonHoverPNG}) no-repeat center;
        color: white;
      }
      `;
    case "2":
      return `  
      background:  url(${active ? Button2HoverPNG : Button2PNG})
      no-repeat center; 
      background-size: 100&;
      
      min-width: 150px;
      :hover {
        background: url(${Button2HoverPNG}) no-repeat center;
        color: white;
      }
      `;
    case "3":
      return `  
      background:  url(${active ? Button2HoverPNG : Button2PNG})
      no-repeat center; 
      width: 222px;
      background-size: 100%;
      :hover {
        background: url(${Button2HoverPNG}) no-repeat center;
        color: white;
        background-size: 100%;
      }
      `;
    case "4":
      return `  
      background:  url(${active ? Button2HoverPNG : Button2PNG})
      no-repeat center; 
      width: 84px;
      background-size: 100%;
      height:25px;
      :hover {
        background: url(${Button2HoverPNG}) no-repeat center;
        color: white;
        background-size: 100%;
      }
      `;
    default:
      return `
      background:  url(${active ? ButtonHoverPNG : ButtonPNG})
      no-repeat center; 
      width: 222px;
      :hover {
        background: url(${ButtonHoverPNG}) no-repeat center;
        color: white;
      }
      `;
  }
};

const CustomButton = styled.div`
  height: 66px;
  ${({ variant, active }) => {
    return variantSwitcher(variant, active);
  }}

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;
  color: ${({ active }) => {
    return active ? "white" : "#00303a";
  }};

  font-weight: ${({ nonBold }) => {
    return nonBold ? "regular" : "bold";
  }};

  font-size: ${({ fontSize }) => {
    return fontSize ? fontSize : "24px";
  }};
`;

const Button = ({ click, text, active, variant, fontSize, nonBold }) => {
  return (
    <CustomButton
      onClick={click}
      active={active}
      variant={variant}
      fontSize={fontSize}
      nonBold={nonBold}
    >
      {text}
    </CustomButton>
  );
};

export default Button;
