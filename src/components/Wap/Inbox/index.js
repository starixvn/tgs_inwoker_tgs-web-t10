import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "../../Wap/Share/Header";

import { accountAction } from "../../../api-services/actions/accountAction";
import { inboxAction } from "../../../api-services/actions/inboxAction";
import BottomScrollListener from "react-bottom-scroll-listener";

import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";

import InboxList from "./InboxList";

const CheckboxContainer = styled.div`
  float: left;
  width: 46px;
  height: 46px;
  margin: 56px 0 0 20px;

  ${(props) => (props.edit ? `display:block` : `display:none`)};
`;
const ContentContainer = styled.div`
  float: left;
  font-size: 28px;
  width: 90%;
`;

const ListItem = styled.div`
  width: 100%;
  margin: 20px auto;
  height: 155px;
`;
const MsgTitle = styled.div`
  color: #2e2426;
  width: 100%;
  font-weight: 600;
  font-size: 30px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MsgTitleSpan = styled.span`
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const MsgDate = styled.div`
  color: #949494;

  float: left;
  margin-top: 15px;
  font-size: 28px;
`;

const ItemContainer = styled.div`
  float: right;
  width: ${(props) => (props.edit ? `648px` : `688px`)};
  height: 150px;
  border-radius: 12px;
  box-shadow: 0 4px 12px 0 rgba(58, 58, 58, 0.2);
  border: solid 2px #f3f3f3;
  background-color: #ffffff;
  padding: 30px 20px 0 35px;
  margin-right: 30px;
`;
const CheckboxCircle = styled.div`
  width: 46px;
  height: 46px;

  ${(props) =>
    props.checked
      ? `background: url(${
          process.env.PUBLIC_URL + `/assets/images/wapp/icon-inbox-checked.png`
        }) no-repeat;`
      : `border-radius: 23px;
    border: 2px solid #949494;`}
`;

const BodyColor = styled.div`
  min-height: 100vh;
`;

class Inbox extends Component {
  state = {
    edit: false,
    limit: 10,
    page: 0,
    isBottom: false,
    selected: [],
    selectedGuid: [],
    loading: false,
    inbox: "",
    view: false,
  };

  componentDidMount() {
    // InboxService.InboxList(0).then((response) => {
    //   if (response.IsSuccess) {
    //     this.setState({
    //       ...this.state,
    //       inbox: response.data,
    //     });
    //   }
    // });

    if (this.props.token != null) {
      this.getMessageList(0, true);
    }
  }
  componentDidUpdate(preProps) {
    // if (preProps.token == null && this.props.token != null) {
    //   this.getMessageList(0);
    // }
  }
  getMessageList = (page, isNew = false) => {
    this.props.getMessages(i18n.language, this.state.limit, page + 1, isNew);
  };
  handleScrollBottom = () => {
    if (this.state.isBottom === false) {
      if (this.props.inbox.items.length < this.props.inbox.totalcount) {
        this.getMessageList(this.state.page + 1);
        this.setState({ ...this.state, page: this.state.page + 1 });
      }
    }
  };
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleEditClick = () => {
    if (this.props.inbox.items.length > 0) {
      this.setState({ ...this.state, edit: !this.state.edit });
    }
  };
  handleItemClick = (id) => {
    if (this.state.edit === false) {
      this.props.setMessageRead([id]).then((response) => {
        this.props.getMessages(i18n.language, 1, 99, true, true);
      });

      this.setState({
        ...this.state,
        view: true,
      });
    }
  };
  handleCheckboxClick = (SubjectID, GUID) => {
    let selected = this.state.selected;
    let selectedGuid = this.state.selectedGuid;
    if (this.state.selected.includes(SubjectID)) {
      selected = selected.filter((item) => item !== SubjectID);
      selectedGuid = selectedGuid.filter((item) => item !== GUID);
    } else {
      selected = selected.concat(SubjectID);
      selectedGuid = selectedGuid.concat(GUID);
    }
    this.setState({
      ...this.state,
      selected: selected,
      selectedGuid: selectedGuid,
    });
  };
  callbackCount = 0;
  // handleCallback = () => {
  //   this.getMessageList(0);
  //   this.setState({
  //     ...this.state,
  //     edit: false,
  //     selectedGuid: [],
  //     selected: [],
  //   });
  // };
  // handleDeleteClick = () => {
  //   this.callbackCount = 0;
  //   InboxService.DeleteMessage(this.props.token, this.state.selected).then(
  //     (response) => {
  //       this.handleCallback();
  //     }
  //   );
  // };
  handleReadClick = () => {
    // this.callbackCount = 0;
    // InboxService.UpdateReadMessage(this.props.token, this.state.selected).then(
    //   (response) => {
    //     this.handleCallback();
    //   }
    // );
  };
  render() {
    return (
      <BodyColor style={{ paddingBottom: this.state.edit ? 120 : 0 }}>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("inbox.title")}
        ></Header>{" "}
        <div style={{ height: 90 }} />
        {
          this.props.inbox
            ? this.props.inbox.items.map((row, index) => {
                return (
                  <InboxList
                    row={row}
                    index={index}
                    selected={this.state.selected}
                    edit={this.state.edit}
                    handleCheckboxClick={this.handleCheckboxClick}
                    handleItemClick={this.handleItemClick}
                  />
                );
              })
            : ""
          // this.props.inbox.list.map((row, index) => {
          //   return (
          //     <ListItem key={index}>
          //       <CheckboxContainer edit={this.state.edit}>
          //         <CheckboxCircle
          //           onClick={() => this.handleCheckboxClick(row.id, row.id)}
          //           checked={this.state.selected.includes(row.id)}
          //         ></CheckboxCircle>
          //       </CheckboxContainer>
          //       <ItemContainer key={row.id} edit={this.state.edit}>
          //         <ContentContainer
          //           onClick={() => this.handleItemClick(row.id, row.id)}
          //         >
          //           <MsgTitle>
          //             <MsgTitleSpan>{row.title_text}</MsgTitleSpan>
          //           </MsgTitle>
          //           <MsgDate>
          //             <Moment format="YYYY-MM-DD">{row.create_time_text}</Moment>
          //           </MsgDate>
          //         </ContentContainer>
          //       </ItemContainer>
          //     </ListItem>
          //   );
          // })
        }
        <BottomScrollListener onBottom={this.handleScrollBottom} />
        <Loading show={this.state.loading}></Loading>
      </BodyColor>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    inbox: state.account.inbox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (language, limit, page, isNew, getCount = false) =>
      dispatch(inboxAction.getMessages(language, page, limit, isNew, getCount)),
    dispatch: dispatch,
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    setMessageRead: (ids) => dispatch(inboxAction.setMessageRead(ids)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
