import React from "react"
import s from './ModalWindow.module.scss'
import {useDispatch} from "react-redux";
import {setOnDisabled} from "../../redux/reducers/packsReducer";

type PropsType = {
  setIsMode: (isMode: boolean) => void
  setModalInputText?: (modalInputText: string) => void
  title: string
}

const ModalWindow: React.FC<PropsType> = React.memo((
  {
    setIsMode,
    setModalInputText,
    title,
    ...restProps
  }
) => {

  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setIsMode(false))
    dispatch(setOnDisabled(false))
  }

  return (
    <div id="myModal" className={s.modal}>
      <div className={s.modal_content}>
        <span className={s.close} onClick={() => closeModal()}>&times;</span>
        <span>{title}</span>
        {restProps.children}
      </div>
    </div>
  )
})

export default ModalWindow