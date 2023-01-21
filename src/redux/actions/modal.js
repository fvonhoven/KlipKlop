import { CLOSE_MODAL, OPEN_MODAL } from "../constants"

export const openModal = (open, data) => dispatch => {
  return dispatch({
    data,
    open,
    modalType: 0,
    type: OPEN_MODAL,
  })
}

export const closeModal = () => dispatch => {
  return dispatch({
    type: CLOSE_MODAL,
  })
}
