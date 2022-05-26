import React from "react";
import Smartsupp from "./smartsupp";
import LiveChatCS from "./livechat";
import Tawkto from "./tawkto";

const LiveChat = ({ vendor, license }) => {
  const typeSwitcher = (vendor) => {
    switch (vendor) {
      case "smartsupp":
        return <Smartsupp smartsuppkey={license} />;
      case "livechat":
        return <LiveChatCS license={license} />;
      case "tawk":
        return <Tawkto license={license} />;
      default:
        return "";
    }
  };

  return typeSwitcher(vendor);
};

export default LiveChat;
