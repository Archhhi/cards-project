import React from "react"
import s from './ModalWindow.module.scss'
import {useDispatch} from "react-redux";

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

  return (
    <div id="myModal" className={s.modal}>
      <div className={s.modal_content}>
        <span className={s.close} onClick={() => dispatch(setIsMode(false))}>&times;</span>
        <span>{title}</span>
        {restProps.children}
      </div>
    </div>
  )
})

export default ModalWindow