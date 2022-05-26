import { AccountService } from "../services/AccountService";

import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETACCOUNT_SUCCESS,
  GETBALANCE_SUCCESS,
  GETACCOUNT_FAILURE,
  GETACCOUNT_BEGIN,
  CHECKTOKEN_BEGIN,
  CHECKTOKEN_SUCCESS,
  CHECKTOKEN_FAILURE,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATECARDNO_BEGIN,
  UPDATECARDNO_FAILURE,
  UPDATECARDNO_SUCCESS,
  GETIDCARDNO_BEGIN,
  GETIDCARDNO_SUCCESS,
  GETIDCARDNO_FAILURE,
  GETPROMOTEUSER_SUCCESS,
  GETPROMOTEBILL_SUCCESS,
} from "../constant/actionType";

export const accountAction = {
  accountLogin,
  accountLogout,
  getAccountInfo,
  getAccountProfile,
  checkTokenIsValid,
  registerAccount,
  updateMemberCardNo,
  getIDCardNo,
  getPromoteUserList,
  getPromoteBillList,
};
function updateMemberCardNo(name, number) {
  return (dispatch) => {
    dispatch({
      type: UPDATECARDNO_BEGIN,
      loading: true,
    });
    const result = AccountService.AddRealName(name, number)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: UPDATECARDNO_SUCCESS,
            payload: {
              IsSuccess: true,
              member_name: name,
              check_pass_account: true,
            },
            loading: false,
          });
        } else {
          dispatch({
            type: UPDATECARDNO_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: UPDATECARDNO_FAILURE,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function accountLogin(username, password) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_BEGIN,
      loading: true,
    });
    const response = await AccountService.Login(username, password);
    if (response.IsSuccess) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
        loading: false,
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response,
        loading: false,
      });
    }
    return response;
  };
}
function accountLogout(token) {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_BEGIN,
      loading: true,
    });
    const response = await AccountService.Logout(token);

    if (response.IsSuccess) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: response,
        loading: false,
      });
    } else {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: response,
        loading: false,
      });
    }

    return response;
  };
}
function checkTokenIsValid() {
  return async (dispatch) => {
    dispatch({
      type: CHECKTOKEN_BEGIN,
      loading: true,
    });
    const response = await AccountService.GetMemberInfo();

    if (response.IsSuccess) {
      dispatch({
        type: CHECKTOKEN_SUCCESS,
        payload: response,
        loading: false,
      });
    } else {
      localStorage.removeItem("token");

      dispatch({
        type: CHECKTOKEN_FAILURE,
        payload: response,
        loading: false,
      });
    }
    return response;
  };
}
function getAccountInfo() {
  return (dispatch) => {
    dispatch({
      type: GETACCOUNT_BEGIN,
      loading: true,
    });
    const result = AccountService.GetMemberInfo()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETACCOUNT_SUCCESS,
            payload: response,
            loading: true,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETACCOUNT_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function getAccountProfile(showVip) {
  return (dispatch) => {
    const result = AccountService.GetMemberInfo()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: showVip === true ? GETACCOUNT_SUCCESS : GETBALANCE_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETACCOUNT_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function registerAccount(
  username,
  pwd,
  confirmpwd,
  invitationcode = "",
  upper
) {
  return async (dispatch) => {
    const result = await AccountService.Register(
      username,
      pwd,
      confirmpwd,
      invitationcode,
      upper
    )
      .then((response) => {
        if (response.IsSuccess) {
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function getIDCardNo() {
  return (dispatch) => {
    dispatch({
      type: GETIDCARDNO_BEGIN,
      loading: true,
    });
    var result = AccountService.GetIDCardNo();
    result
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETIDCARDNO_SUCCESS,
            payload: response,
            loading: true,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETIDCARDNO_FAILURE,
            payload: response,
            loading: false,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GETIDCARDNO_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function getPromoteUserList(limit, page) {
  return (dispatch) => {
    var result = AccountService.GetPromoteUser(page, limit);
    result.then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOTEUSER_SUCCESS,
          payload: response,
          isNew: page === 0,
        });
      }
    });
    return result;
  };
}
function getPromoteBillList(limit, page) {
  return (dispatch) => {
    var result = AccountService.GetPromoteBill(page, limit);
    result.then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOTEBILL_SUCCESS,
          payload: response,
          isNew: page === 0,
        });
      }
    });
    return result;
  };
}
