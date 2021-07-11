import React, {useState} from "react"
import {setIsModeEdit, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {setAnswer, setQuestion} from "../../../redux/reducers/cardsReducer";
import {RootStateType} from "../../../redux/store";
import {CardsType} from "../../../types/types";

type PropsType = {
  id: string
  updateCard: (id: string) => void
}

const EditCard: React.FC<PropsType> = React.memo((
  {
    id,
    updateCard
  }
) => {

  const dispatch = useDispatch()
  const cards = useSelector<RootStateType, CardsType[]>(state => state.cards.cards)

  let [question, setQuestionL] = useState<any>(cards.find(card => card._id === id)?.question)
  let [answer, setAnswerL] = useState<any>(cards.find(card => card._id === id)?.answer)

  const changeInputQuestion = (text: string) => {
    setQuestionL(text)
    dispatch(setQuestion(question))
  }
  const changeInputAnswer = (text: string) => {
    setAnswerL(text)
    dispatch(setAnswer(answer))
  }

  const closeModal = () => {
    dispatch(setIsModeEdit(false))
    dispatch(setOnDisabled(false))
  }

  const saveAndClose = (id: string) => {
    updateCard(id)
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeEdit}
      title={'Edit Card'}
    >
      <SuperInput
        type={'text'}
        value={question}
        onChangeText={(text) => changeInputQuestion(text)}
      />
      <SuperInput
        type={'text'}
        value={answer}
        onChangeText={(text) => changeInputAnswer(text)}
      />
      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => closeModal()}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => saveAndClose(id)}
      >Save</SuperButton>
    </ModalWindow>
  )
})

export default EditCard