import React, {useState} from "react"
import {setIsModeDelete, setIsModeEdit, setModalText, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {setAnswer, setQuestion} from "../../../redux/reducers/cardsReducer";
import {RootStateType} from "../../../redux/store";
import {CardPacksType, CardsType} from "../../../types/types";

type PropsType = {
  id: string
  updatePack: (id: string) => void
}

const EditPack: React.FC<PropsType> = React.memo((
  {
    id,
    updatePack
  }
) => {

  const dispatch = useDispatch()
  const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.packs.cardPacks)

  let [name, setNameL] = useState<any>(cardPacks.find(card => card._id === id)?.name)

  const changeInputName = (text: string) => {
    setNameL(text)
    dispatch(setModalText(name))
  }

  const closeModal = () => {
    dispatch(setIsModeEdit(false))
    dispatch(setOnDisabled(false))
  }

  const saveAndClose = (id: string) => {
    updatePack(id)
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeEdit}
      title={'Edit Pack'}
    >
      <SuperInput
        type={'text'}
        value={name}
        onChangeText={(text) => changeInputName(text)}
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

export default EditPack