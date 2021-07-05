import React from "react"
import {setIsModeAdd} from "../../../redux/reducers/packsReducer";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch} from "react-redux";
import {setAnswer, setQuestion} from "../../../redux/reducers/cardsReducer";

type PropsType = {
  addCard: () => void
}

const AddNewCard: React.FC<PropsType> = React.memo((
  {
    addCard
  }
) => {

  const dispatch = useDispatch()

  return (
    <ModalWindow
      setIsMode={setIsModeAdd}
      title={'Card Info'}
    >
      <SuperInput
        type={'text'}
        onChangeText={(text) => dispatch(setQuestion(text))}
      />
      <SuperInput
        type={'text'}
        onChangeText={(text) => dispatch(setAnswer(text))}
      />
      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => dispatch(setIsModeAdd(false))}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => addCard()}
      >Save</SuperButton>
    </ModalWindow>
  )
})

export default AddNewCard