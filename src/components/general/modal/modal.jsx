import React, { useEffect, useRef } from "react"
import BottomSheet from "@gorhom/bottom-sheet"
import { useSelector, useDispatch } from "react-redux"
import { closeModal } from "../../../redux/actions"
import { CommentModal } from "./comment/comment-modal"

export function Modal() {
  const modalState = useSelector(state => state.modal)
  const bottomSheetRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current?.expand()
    }
  }, [modalState])

  const renderContent = () => {
    switch (modalState.modalType) {
      case 0:
        return <CommentModal post={modalState.data} />

      default:
        return <></>
    }
  }

  const onClose = () => {
    dispatch(closeModal())
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onClose={onClose}
      snapPoints={["50%"]}
      index={-1}
      handleHeight={40}
      enablePanDownToClose
    >
      {renderContent()}
    </BottomSheet>
  )
}
