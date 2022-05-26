import uiReducer from "./uiReducer";
import { accountReducer } from "./accountReducer";
import { bonusReducer } from "./bonusReducer";
import { generalReducer } from "./generalReducer";
import { gameReducer } from "./gameReducer";
import walletReducer from "./walletReducer";
import modalReducer from "./modalReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  ui: uiReducer,
  account: accountReducer,
  bonus: bonusReducer,
  modal: modalReducer,
  general: generalReducer,
  wallet: walletReducer,
  game: gameReducer,
});

export default rootReducer;
