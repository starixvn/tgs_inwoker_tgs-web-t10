import React from "react";
import styled from "styled-components";

const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat right top;
  background-size: 100% 100%;
  position: relative;

  margin: 10px auto;
  border-radius: 10px;
  width: 690px;
  height: 280px;
`;
const LayoutOne = (props) => {
  return props.promotionList.items.map((row, index) => {
    if (row.localization !== null) {
      return (
        <ListItem
          key={index}
          src={
            row.localization.mobileBanner &&
            row.localization.mobileBanner !== null
              ? row.localization.mobileBanner
              : row.mobileBanner
          }
          onClick={() => props.handlePromoClick(row.id)}
        ></ListItem>
      );
    } else {
      return (
        <ListItem
          key={index}
          src={row.mobileBanner}
          onClick={() => props.handlePromoClick(row.id)}
        ></ListItem>
      );
    }
  });
};

export default LayoutOne;
