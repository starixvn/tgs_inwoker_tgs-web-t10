import { UiService } from "../services/UiService";
import {
  GETMARQUEE_SUCCESS,
  GETMARQUEE_BEGIN,
  GETMARQUEE_FAIL,
  GETANNOUNCEMENT_SUCCESS,
  GETANNOUNCEMENT_BEGIN,
  GETANNOUNCEMENT_FAIL,
} from "../constant/actionType";
// These are the constants to represent each of three recommended actions for a single API fetch or post.

export const uiAction = {
  getMarquee,
  getAnnouncement,
};

function getMarquee(language) {
  return (dispatch) => {
    dispatch({
      type: GETMARQUEE_BEGIN,
      loading: true,
    });
    const result = UiService.GetMarquee(language)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETMARQUEE_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETMARQUEE_FAIL,
          loading: false,
        });
      });

    return result;
  };
}

function getAnnouncement(language) {
  return (dispatch) => {
    dispatch({
      type: GETANNOUNCEMENT_BEGIN,
      loading: true,
    });
    const result = UiService.GetMarquee(language)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETANNOUNCEMENT_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETANNOUNCEMENT_FAIL,
          loading: false,
        });
      });

    return result;
  };
}
