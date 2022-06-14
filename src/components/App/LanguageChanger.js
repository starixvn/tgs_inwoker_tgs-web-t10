import { Popover } from "@material-ui/core";

import React from "react";
import styled from "styled-components";
import i18n from "../../utils/i18n";

const CustomPopover = styled(Popover)``;

const PopoverButton = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  cursor: pointer;
  user-select: none;
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const CustomButton = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Flag = styled.div`
  background: url(${({ src }) => src}) center no-repeat;
  width: 80px;
  height: 54px;
  zoom: 0.3;
`;

const VerySmallFlag = styled(Flag)`
  zoom: 0.3;
  margin-right: 30px;
`;

const LanguageChanger = ({ language }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const labelChanger = (language) => {
    switch (language) {
      case "zh-TW":
        return "繁体中文";
      case "zh-CN":
        return "简体中文";
      case "en-US":
        return "English";
      default:
        return language;
    }
  };

  return (
    <div>
      <CustomButton onClick={handlePopoverOpen}>
        <Flag
          src={
            process.env.PUBLIC_URL +
            `/assets/images/language/${i18n.language}.png`
          }
          alt={i18n.language}
        />
      </CustomButton>
      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {language.map((lang, index) => {
          return (
            <>
              <PopoverButton
                onClick={() => {
                  window.location.href = `/${lang.culturecode}`;
                }}
              >
                <VerySmallFlag
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/language/${lang.culturecode}.png`
                  }
                />
                <div>{labelChanger(lang.culturecode)}</div>
              </PopoverButton>
            </>
          );
        })}
      </CustomPopover>
    </div>
  );
};

export default LanguageChanger;
