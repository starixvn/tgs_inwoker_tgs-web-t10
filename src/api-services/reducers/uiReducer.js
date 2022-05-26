import {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_LOGIN,
  SHOWING_DIALOG,
  UPDATING_SCREEN_SIZE,
  UPDATING_JACKPOT,
  GETMARQUEE_SUCCESS,
  GETMARQUEE_BEGIN,
  GETBANNER_SUCCESS,
  GETBANNER_BEGIN,
  GETANNOUNCEMENT_SUCCESS,
  GETANNOUNCEMENT_BEGIN,
} from "../constant/actionType";

const initState = {
  showLogin: false,
  loading: false,
  message: "",
  board_list: [],
  marqueeText: [],
  showingDialog: false,
  jackpotAmount: "00,000,000.00",
  marquees: [],
  mains: [],
  deposits: []
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATING_JACKPOT:
      return {
        ...state,
        jackpotAmount: action.payload,
      };
    case UPDATING_SCREEN_SIZE:
      return {
        ...state,
        screenWidth: action.width,
        screenHeight: action.height,

        scale: action.scale,
      };
    case SHOW_LOGIN:
      return {
        ...state,
        showLogin: action.payload,
      };

    case SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        message: "",
        loading: false,
      };
    case SHOWING_DIALOG:
      return {
        ...state,
        showingDialog: action.payload,
      };
    case GETBANNER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GETBANNER_SUCCESS:
      return {
        ...state,
        board_list: action.payload.list,
      };
    case GETMARQUEE_BEGIN:
    case GETANNOUNCEMENT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GETMARQUEE_SUCCESS:
      let marqueeText = [];
      action.payload.map((item) => {
        marqueeText.push(item);
      });
      return {
        ...state,
        marqueeText: marqueeText,
      };
    case GETANNOUNCEMENT_SUCCESS:
      const { marquees, mains, deposits} = action.payload;
      return {
        ...state,
        marquees: marquees,
        mains: mains,
        deposits: deposits
      };
    default:
      return state;
  }
};

export default uiReducer;
