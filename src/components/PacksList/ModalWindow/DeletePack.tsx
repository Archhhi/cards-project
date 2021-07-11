import React from "react"
import {setIsModeDelete, setModalText, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch} from "react-redux";

type PropsType = {
  id: string
  modalText: string
  deletePack: (id: string) => void
}

const DeletePack: React.FC<PropsType> = React.memo((
  {
    id,
    modalText,
    deletePack
  }
) => {

  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setIsModeDelete(false))
    dispatch(setOnDisabled(false))
  }

  const deleteAndClose = (id: string) => {
    deletePack(id)
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeDelete}
      title={'Delete Pack'}
    >
      <p>
        Do you really want to remove <b>PackName - {modalText}</b>?
        All cards will be excluded from this course.
      </p>
      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => closeModal()}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => deleteAndClose(id)}
      >Delete</SuperButton>
    </ModalWindow>
  )
})

export default DeletePack