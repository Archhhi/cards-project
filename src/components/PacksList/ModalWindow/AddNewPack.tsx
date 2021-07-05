import React from "react"
import {setIsModeAdd, setModalText} from "../../../redux/reducers/packsReducer";
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
        onClick={() => dispatch(setIsModeAdd(false))}
      >Cancel</SuperButton>
      <SuperButton
        className={stylesForButton.buttonForModalSave}
        onClick={() => addPack()}
      >Add</SuperButton>
    </ModalWindow>
  )
})

export default AddNewPack