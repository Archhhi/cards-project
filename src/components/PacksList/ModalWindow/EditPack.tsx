import React from "react"
import {setIsModeDelete, setIsModeEdit, setModalText, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch} from "react-redux";

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

  const closeModal = () => {
    dispatch(setIsModeEdit(false))
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeEdit}
      title={'Edit Pack'}
    >
      <SuperInput
        type={'text'}
        onChangeText={(name) => dispatch(setModalText(name))}
      />
      <SuperButton
        className={stylesForButton.buttonForModalCancel}
        onClick={() => closeModal()}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => updatePack(id)}
      >Save</SuperButton>
    </ModalWindow>
  )
})

export default EditPack