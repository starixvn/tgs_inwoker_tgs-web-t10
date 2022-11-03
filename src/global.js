import { createGlobalStyle } from "styled-components";
import i18n from "./utils/i18n";
import "./assets/fonts/notosans/notosans-sc/css.css";
import "./assets/fonts/notosans/notosans-tc/css.css";
import config from "./config/config";

const languageSwitcher = (language, brand) => {
  if (language === "en-US") {
    if (brand === "TIGER") {
      return `Roboto`;
    }
  } else if (language === "zh-CN") {
    return `'Noto Sans SC', Microsoft Yahei, '微软雅黑', STXihei, '华文细黑'`;
  } else if (language === "zh-TW") {
    return `'Noto Sans TC', Tahoma, Helvetica, Arial, sans-serif, '微軟正黑粗'`;
  } else {
    return `Tahoma, Helvetica, Arial, sans-serif`;
  }
};

export const GlobalStyles = createGlobalStyle`


  * {
    font-family: ${languageSwitcher(i18n.language, config.brand)};
  }
  
  body {
    background: ${({ theme }) => theme.body};
    background-size: 100%;
  }

  .headerSubmenu .slick-track,
  .headerSubmenu .slick-slider .slick-list {
    height: auto;
  }
  
  .headerSubmenu .slick-slide > div {
    display: flex;
    align-items: center;
  }
  
  .headerSubmenu .slick-prev {
    left: 0;
    top: 90px;
  }
  
  .headerSubmenu .slick-next {
    right: 0;
    top: 90px;
  }
  .headerSubmenu.slick-slider .slick-track,
  .headerSubmenu.slick-slider .slick-list {
    margin-left: 25px;
    margin-right: 35px;
  }

  .headerSubmenu .slick-prev::before,
  .headerSubmenu .slick-next::before {
    color: ${({ theme }) => theme.primaryText}; 
    position: relative;top: -20px;
  }

  .headerSubmenu .slick-prev::before{
    content: url(${
      process.env.PUBLIC_URL + "/assets/images/pcHeaderMenu/left.png"
    });
  
  
  left: 0;
  
  }

  .headerSubmenu .slick-next::before {
    content: url(${
      process.env.PUBLIC_URL + "/assets/images/pcHeaderMenu/right.png"
    }); right: 20px;
  }
  

  


`;
