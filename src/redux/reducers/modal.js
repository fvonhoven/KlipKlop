import { CLOSE_MODAL, OPEN_MODAL } from "../constants"

const initialState = {
  open: false,
  data: null,
  modalType: -1,
}

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: action.open,
        data: action.data,
        modalType: action.modalType,
      }
    case CLOSE_MODAL:
      return initialState
    default:
      return state
  }
}
