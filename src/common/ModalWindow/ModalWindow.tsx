import React from "react"
import s from './ModalWindow.module.scss'

type PropsType = {
  setIsMode: (isMode: boolean) => void
  setModalInputText?: (modalInputText: string) => void
  title: string
}

const ModalWindow: React.FC<PropsType> = (
  {
    setIsMode,
    setModalInputText,
    title,
    ...restProps
  }
) => {
  return (
    <div id="myModal" className={s.modal}>
      <div className={s.modal_content}>
        <span className={s.close} onClick={() => setIsMode(false)}>&times;</span>
        <span>{title}</span>
        {restProps.children}
      </div>
    </div>
  )
}

export default ModalWindow