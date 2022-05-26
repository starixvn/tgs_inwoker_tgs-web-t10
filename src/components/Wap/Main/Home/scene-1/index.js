import React from "react";
import Template10 from "./template10";
import Template2 from "./template2";
import Template3 from "./template3";
import Template4 from "./template4";
import Template5 from "./template5";
import Template6 from "./template6";
import Template7 from "./template7";
import Template8 from "./template8";
import Template9 from "./template9";

const TemplateSwitcher = ({
  template,
  gameTypeListSorting,
  homePageGameList,
  getImgPrefix,
  selectedGameType,
  convertGameTypeToText,
  handleGameTypeClick,
  handleGameClick,
  gameMenu,
  gameMenu2,
  shiftScene,
  changeShowGame,
  scrollRef,
  handleSignupClick,
  listOfGame,
  getBannerTemplate,
}) => {
  const commonprops = {
    gameTypeListSorting: gameTypeListSorting,
    homePageGameList: homePageGameList,
    getImgPrefix: getImgPrefix,
    selectedGameType: selectedGameType,
    convertGameTypeToText: convertGameTypeToText,
    handleGameTypeClick: handleGameTypeClick,
    handleGameClick: handleGameClick,
    gameMenu: gameMenu,
    gameMenu2: gameMenu2,
    shiftScene: shiftScene,
    changeShowGame: changeShowGame,
    template: template,
    scrollRef: scrollRef,
    handleSignupClick: handleSignupClick,
    listOfGame: listOfGame,
    getBannerTemplate: getBannerTemplate,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 2:
      case "2":
        return <Template2 {...commonprops} />;
      case 3:
      case "3":
        return <Template3 {...commonprops} />;
      case 4:
      case "4":
        return <Template4 {...commonprops} />;
      case 5:
      case "5":
        return <Template5 {...commonprops} />;
      case 6:
      case "6":
        return <Template6 {...commonprops} />;
      case 7:
      case "7":
        return <Template7 {...commonprops} />;
      case 8:
      case "8":
        return <Template8 {...commonprops} />;
      case 9:
      case "9":
        return <Template9 {...commonprops} />;
      case 10:
        return <Template10 {...commonprops} />;
      default:
        <Template2 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export default TemplateSwitcher;
