import {
  KYGAMELIST_SUCCESS,
  GETHOMEPAGEGAMELIST_BEGIN,
  GETHOMEPAGEGAMELIST_SUCCESS,
  GETHOMEPAGEGAMELIST_FAIL,
  GETGAMEPLATFORMLIST_BEGIN,
  GETGAMEPLATFORMLIST_SUCCESS,
  GETGAMEPLATFORMLIST_FAIL,
  GETGAMEBALANCE_BEGIN,
  GETGAMEBALANCE_SUCCESS,
  GETGAMEBALANCE_FAIL,
  GETFAVGAME_SUCCESS,
} from "../constant/actionType";

const initialState = {
  pending: false,
  kyGameList: [],
  kyHotGameList: [],
  homePageGameList: [],
  providerList: [],
  error: null,
  favGame: [],
  containTransferWallet: false,
};

export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case KYGAMELIST_SUCCESS:
      return {
        ...state,
        kyGameList: action.payload.data.list,
        kyHotGameList: action.payload.data.hot_list,
      };
    case GETHOMEPAGEGAMELIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
        homePageGameList: [],
      };
    case GETHOMEPAGEGAMELIST_SUCCESS:
      var gameList = action.payload.data;
      var list = [];
      var providerList = [];
      for (var i = 0; i < gameList.length; i++) {
        for (var x = 0; x < gameList[i].gametypes.length; x++) {
          list.push({
            abbreviation: gameList[i].code,
            game_platform_id: 0,
            game_platform_name: gameList[i].name,
            is_try: 2,
            name: gameList[i].name,
            params: null,
            type: gameList[i].gametypes[x],
            status: gameList[i].status,
          });
        }
        providerList.push({
          abbreviation: gameList[i].code,
          transferwallet: gameList[i].transferwallet,
          name: gameList[i].name,
          status: gameList[i].status,
          balance: 0,
        });
      }

      return {
        ...state,
        homePageGameList: list,
        providerList: providerList,
        loading: false,
        containTransferWallet:
          Object.values(providerList).filter(
            (item) => item.transferwallet === true
          ).length > 0,
      };
    case GETHOMEPAGEGAMELIST_FAIL:
      return {
        ...state,
        message: action.payload,
        homePageGameList: [],
        loading: false,
      };
    case GETGAMEPLATFORMLIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
        gamePlatformList: [],
      };
    case GETGAMEPLATFORMLIST_SUCCESS:
      return {
        ...state,
        gamePlatformList: action.payload.data,
        loading: false,
      };
    case GETGAMEPLATFORMLIST_FAIL:
      return {
        ...state,
        message: action.payload,
        gamePlatformList: [],
        loading: false,
      };
    case GETGAMEBALANCE_BEGIN:
      return {
        ...state,
      };
    case GETGAMEBALANCE_SUCCESS:
      var providerList = [...state.providerList];
      var index = -1;
      providerList.map((a, i) => {
        if (a.abbreviation === action.gpcode) {
          index = i;
        }
      });
      providerList[index].balance = action.payload.data.balance;
      return {
        providerList: providerList,
        ...state,
      };
    case GETGAMEBALANCE_FAIL:
      return {
        ...state,
      };
    case GETFAVGAME_SUCCESS:
      return {
        ...state,
        favGame: [...state.favGame, ...action.payload.data],
      };
    default:
      return state;
  }
}
function formatSorting(type) {
  switch (type) {
    case 4:
      return 20;
    case 7:
      return 22;
    case 8:
      return 21;
    default:
      return type;
  }
}
