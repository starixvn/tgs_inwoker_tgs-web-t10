import React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import i18n from "../../utils/i18n";
import ArrowDown from "../../assets/images/arrowdown.svg";
import styled from "styled-components";
import { AppHistory } from "../../history/History";

const ArrowDownImg = styled.div`
  height: 10px;
  width: 10px;
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 10px;
  background: #fff;
  mask: url(${({ src }) => {
    return src;
  }});
  mask-repeat: no-repeat;
  mask-size: 100%;
`;

const Text = styled.div`
  font-size: 14px;
`;

const TheContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LanguangeChanger = ({ language, changeLanguage }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <TheContainer>
        <Text
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {i18n.t("lang.language")}
        </Text>
        <ArrowDownImg src={ArrowDown} />
      </TheContainer>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {language.map((data, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                i18n.changeLanguage(data.culturecode);
                AppHistory.replace("/" + data.culturecode);
                changeLanguage(data.culturecode);
                handleClose();
              }}
            >
              {i18n.t("lang." + data.culturecode)}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default LanguangeChanger;
