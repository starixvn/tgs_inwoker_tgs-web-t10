import { CLOSE_MODAL, SHOW_MODAL } from "../constant/actionType";
const initState = {
  isOpen: false,
  pageName: "",
};

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isOpen: true,
        pageName: action.pageName,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        pageName: "",
      };
    default:
      return state;
  }
};

export default modalReducer;
