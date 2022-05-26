import React from "react";
import Template3 from "./template3";
import Template4 from "./template4";
import Template5 from "./template5";
import Template6 from "./template6";
import Template7 from "./template7";

const GamePicker = ({
  template,
  getImgPrefix,
  selectedGameType,
  handleGameClick,
  gameMenu,
  shiftScene,
  changeShowGame,
  listOfGame,
  gameTypeListSorting,
  selected,
}) => {
  const commonprops = {
    getImgPrefix: getImgPrefix,
    selectedGameType: selectedGameType,
    handleGameClick: handleGameClick,
    gameMenu: gameMenu,
    shiftScene: shiftScene,
    changeShowGame: changeShowGame,
    template: template,
    listOfGame: listOfGame,
    gameTypeListSorting: gameTypeListSorting,
    selected: selected,
  };

  const switchTemplate = (template) => {
    switch (template) {
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
      default:
        return <Template3 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export default GamePicker;
