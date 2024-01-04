import React, { useEffect } from "react";
import config from "../config/config";

const VersionNumber = () => {
  const [version, setVersion] = React.useState("");
  function getJsonData() {
    return fetch(config.configUrl + "versionnumber.json")
      .then((response) => response.json())
      .then((responseJson) => {
        setVersion(responseJson.version);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!version) {
      getJsonData();
    }
  }, []);

  return config.version || version || process.env.REACT_APP_VERSION;
};

export default VersionNumber;
