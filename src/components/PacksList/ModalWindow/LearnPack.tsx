import React, {useEffect, useState} from "react"
import {setIsModeLearn, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {CardsType} from "../../../types/types";
import {getCardsTC} from "../../../redux/reducers/cardsReducer";

type PropsType = {
  id: string
  modalText: string
  learnPack: (id: string) => void
}

const LearnPack: React.FC<PropsType> = React.memo((
  {
    id,
    modalText,
    learnPack
  }
) => {

  const dispatch = useDispatch()
  const cards = useSelector<RootStateType, CardsType[]>(state => state.cards.cards)

  const question = cards.find(card => card.cardsPack_id === id)?.question

  const closeModal = () => {
    dispatch(setIsModeLearn(false))
    dispatch(setOnDisabled(false))
  }

  const learnAndClose = (id: string) => {
    learnPack(id)
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeLearn}
      title={`Learn ${modalText}`}
    >
      <h3>
        Question: "{question}"
      </h3>
      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => closeModal()}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => learnAndClose(id)}
      >Show answer</SuperButton>
    </ModalWindow>
  )
})

export default LearnPack