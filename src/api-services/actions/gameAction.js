import { GameService } from "../services/GameService";
import {
  GETHOMEPAGEGAMELIST_BEGIN,
  GETHOMEPAGEGAMELIST_SUCCESS,
  GETHOMEPAGEGAMELIST_FAIL,
  GETFAVGAME_BEGIN,
  GETFAVGAME_SUCCESS,
  GETFAVGAME_FAIL,
  REMOVEFAVGAME_BEGIN,
  REMOVEFAVGAME_SUCCESS,
  REMOVEFAVGAME_FAIL,
  SETFAVGAME_BEGIN,
  SETFAVGAME_SUCCESS,
  SETFAVGAME_FAIL,
} from "../constant/actionType";
export const gameAction = {
  getHomePageGameList,

  setFavoriteGame,
  removeFavoriteGame,
  getFavoriteGame,
};

function getHomePageGameList() {
  return (dispatch) => {
    dispatch({
      type: GETHOMEPAGEGAMELIST_BEGIN,
      loading: true,
    });
    const result = GameService.GetHomePageGameList()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETHOMEPAGEGAMELIST_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: GETHOMEPAGEGAMELIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETHOMEPAGEGAMELIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function setFavoriteGame(gameId) {
  return (dispatch) => {
    dispatch({
      type: SETFAVGAME_BEGIN,
      loading: true,
    });
    const result = GameService.SetFavoriteGame(gameId)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: SETFAVGAME_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: SETFAVGAME_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: SETFAVGAME_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function removeFavoriteGame(gameId) {
  return (dispatch) => {
    dispatch({
      type: REMOVEFAVGAME_BEGIN,
      loading: true,
    });
    const result = GameService.RemoveFavoriteGame(gameId)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: REMOVEFAVGAME_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: REMOVEFAVGAME_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: REMOVEFAVGAME_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function getFavoriteGame(gameType) {
  return (dispatch) => {
    dispatch({
      type: GETFAVGAME_BEGIN,
      loading: true,
    });
    const result = GameService.GetFavoriteGame(gameType)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETFAVGAME_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: GETFAVGAME_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETFAVGAME_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
