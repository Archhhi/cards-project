import React from "react"
import {setIsModeEdit, setModalText} from "../../../redux/reducers/packsReducer";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch} from "react-redux";
import {setQuestion} from "../../../redux/reducers/cardsReducer";

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

  return (
    <ModalWindow
      setIsMode={setIsModeEdit}
      title={'Edit Card'}
    >
      <SuperInput
        type={'text'}
        onChangeText={(text) => dispatch(setQuestion(text))}
      />
      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => dispatch(setIsModeEdit(false))}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => updateCard(id)}
      >Save</SuperButton>
    </ModalWindow>
  )
})

export default EditCard