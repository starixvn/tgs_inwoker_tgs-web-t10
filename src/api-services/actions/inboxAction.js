import {
  GETMESSAGE_BEGIN,
  GETMESSAGE_FAILED,
  GETMESSAGE_SUCCESS,
  SETMESSAGEREAD_BEGIN,
  SETMESSAGEREAD_FAILED,
  SETMESSAGEREAD_SUCCESS,
} from "../constant/actionType";
import { InboxService } from "../services/InboxService";

export const inboxAction = { getMessages, setMessageRead };
function getMessages(language, pages, limit, isNew = true, getCount = false) {
  return (dispatch) => {
    dispatch({
      type: GETMESSAGE_BEGIN,
      loading: true,
    });
    const result = InboxService.InboxList(language, pages, limit)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETMESSAGE_SUCCESS,
            payload: response,
            loading: true,
            isNew: isNew,
            getCount: getCount,
          });
        } else {
          dispatch({
            type: GETMESSAGE_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETMESSAGE_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function setMessageRead(ids) {
  return (dispatch) => {
    dispatch({
      type: SETMESSAGEREAD_BEGIN,
      loading: true,
    });
    const result = InboxService.UpdateReadMessage(ids) //TODO: parameter pending
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: SETMESSAGEREAD_SUCCESS,
            payload: response,
            loading: true,
            ids: ids,
          });
        } else {
          dispatch({
            type: SETMESSAGEREAD_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: SETMESSAGEREAD_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
