import React from "react"
import {setIsModeLearn, setIsModeShowAnswer, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {CardsType} from "../../../types/types";

type PropsType = {
  id: string
  modalText: string
  showAnswer: (id: string) => void
}

const ShowAnswerPack: React.FC<PropsType> = React.memo((
  {
    id,
    modalText,
    showAnswer
  }
) => {

  const dispatch = useDispatch()
  const cards = useSelector<RootStateType, CardsType[]>(state => state.cards.cards)

  const question = cards.find(card => card.cardsPack_id === id)?.question
  const answer = cards.find(card => card.cardsPack_id === id)?.answer

  const closeModal = () => {
    dispatch(setIsModeShowAnswer(false))
    dispatch(setOnDisabled(false))
  }

  const ShowAnswerAndClose = (id: string) => {
    showAnswer(id)
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeShowAnswer}
      title={`Learn ${modalText}`}
    >
      <div>
        <span>Question: "{question}"</span>
        <span>Answer: "{answer}"</span>
      </div>

      <div>
        <span>Rate yourself:</span>

        <ul>
          <li>Did not know</li>
          <li>Forgot</li>
          <li>A lot of thought</li>
          <li>Confused</li>
          <li>Knew the answer</li>
        </ul>
      </div>

      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => closeModal()}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => ShowAnswerAndClose(id)}
      >Next</SuperButton>
    </ModalWindow>
  )
})

export default ShowAnswerPack