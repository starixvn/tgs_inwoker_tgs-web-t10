import {
  BONUSNEW_BEGIN,
  BONUSNEW_SUCCESS,
  BONUSNEW_FAILURE,
} from "../constant/actionType";
const initialState = {
  pending: false,
  new: [],

  joinPromoResult: null,
  token: null,
  error: null,
};
export function bonusReducer(state = initialState, action) {
  switch (action.type) {
    case BONUSNEW_BEGIN:
      return {
        ...state,
        loading: action.loading,
      };

    case BONUSNEW_SUCCESS:
      return {
        ...state,
        new: action.payload.data,
        loading: action.loading,
      };
    case BONUSNEW_FAILURE:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
}
