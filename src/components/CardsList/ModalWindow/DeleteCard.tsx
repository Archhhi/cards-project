import React from "react"
import {setIsModeDelete, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";

type PropsType = {
  id: string
  deleteCard: (id: string) => void
}

const DeleteCard: React.FC<PropsType> = React.memo((
  {
    id,
    deleteCard
  }
) => {

  const dispatch = useDispatch()
  const question = useSelector<RootStateType, string>(state => state.cards.question)

  const closeModal = () => {
    dispatch(setIsModeDelete(false))
    dispatch(setOnDisabled(false))
  }

  const deleteAndClose = (id: string) => {
    deleteCard(id)
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeDelete}
      title={'Delete Pack'}
    >
      <p>
        Do you really want to remove <b>CardName - {question}</b> ?
        All cards will be excluded from this course.
      </p>
      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => closeModal}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => deleteAndClose(id)}
      >Delete</SuperButton>
    </ModalWindow>
  )
})

export default DeleteCard