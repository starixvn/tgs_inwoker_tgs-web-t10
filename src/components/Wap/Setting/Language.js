import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import CheckIcon from "@material-ui/icons/Check";
import i18n from "../../../utils/i18n";
import { withStyles } from "@material-ui/core/styles";
import CustomButton from "../Share/Button";
import config from "../../../config/config";
const imageMap = {
  "zh-CN": process.env.PUBLIC_URL + `/assets/images/wapp/cn.png`,
  "zh-TW": process.env.PUBLIC_URL + `/assets/images/wapp/tw.png`,
  "en-US": process.env.PUBLIC_URL + `/assets/images/wapp/en.png`,
  "th-TH": process.env.PUBLIC_URL + `/assets/images/wapp/th.png`,
  "vi-VN": process.env.PUBLIC_URL + `/assets/images/wapp/vn.png`,
  "id-ID": process.env.PUBLIC_URL + `/assets/images/wapp/id.png`,
};
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  min-height: 100vh;
`;

const CustomList = withStyles({
  root: {
    width: "100%",
    maxWidth: 750,
    backgroundColor: "#fff",
    fontSize: "30px",
    marginTop: 10,
  },
})(List);
const CustomListItem = withStyles({
  root: {
    padding: "16px 20px",
    borderBottom: "solid 1px #000",
  },
})(ListItem);
const CustomListItemText = withStyles({
  primary: {
    padding: "0px 30px",
    fontSize: "34px",
  },
})(ListItemText);
class Profile extends Component {
  state = {
    checked: i18n.language,
  };
  languages = [
    { name: "简体中文", code: "zh-CN" },
    { name: "繁体中文", code: "zh-TW" },
    { name: "English", code: "en-US" },
  ];
  componentDidMount() {
    if (this.props.account.token === null) {
      this.props.appHistory.replace("/" + i18n.language + "/login");
    }
  }
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleToggle = (value) => () => {
    this.setState({ ...this.state, checked: value });
  };
  handleUpdate = () => {
    window.location.href = `/${this.state.checked}`;
  };
  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("common.language")}
        ></Header>{" "}
        <div style={{ height: 90 }} />
        <CustomList>
          {this.props.general.brandLanguage.map((value) => {
            const labelId = `checkbox-list-label-${value.culturecode}`;

            return (
              <CustomListItem
                key={value.culturecode}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value.culturecode)}
              >
                <ListItemIcon>
                  <img src={imageMap[value.culturecode]}></img>
                </ListItemIcon>
                <CustomListItemText
                  id={labelId}
                  primary={i18n.t("lang." + value.culturecode)}
                />
                <ListItemSecondaryAction>
                  {(() => {
                    if (this.state.checked === value.culturecode) {
                      return <CheckIcon style={{ fontSize: 60 }}></CheckIcon>;
                    } else {
                      return null;
                    }
                  })()}
                </ListItemSecondaryAction>
              </CustomListItem>
            );
          })}
        </CustomList>
        <CustomButton
          label={i18n.t("common.update")}
          style={{ margin: "50px auto" }}
          onClick={this.handleUpdate}
        ></CustomButton>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};
export default connect(mapStateToProps, null)(withRouter(Profile));
