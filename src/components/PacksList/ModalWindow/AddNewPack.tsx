import React from "react"
import {setIsModeAdd, setModalText, setOnDisabled} from "../../../redux/reducers/packsReducer";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperButton from "../../../common/SuperButton/SuperButton";
import stylesForButton from "../../../common/styles/styles.module.scss";
import ModalWindow from "../../../common/ModalWindow/ModalWindow";
import {useDispatch} from "react-redux";

type PropsType = {
  addPack: () => void
}

const AddNewPack: React.FC<PropsType> = React.memo((
  {
    addPack
  }
) => {

  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setIsModeAdd(false))
    dispatch(setOnDisabled(false))
  }

  const addAndClose = () => {
    addPack()
    dispatch(setOnDisabled(false))
  }

  return (
    <ModalWindow
      setIsMode={setIsModeAdd}
      title={'Add new Pack'}
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
        onClick={() => addAndClose()}
      >Add</SuperButton>
    </ModalWindow>
  )
})

export default AddNewPack