import React from "react"
import {setIsModeDelete} from "../../../redux/reducers/packsReducer";
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
        onClick={() => dispatch(setIsModeDelete(false))}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => deletePack(id)}
      >Delete</SuperButton>
    </ModalWindow>
  )
})

export default DeletePack