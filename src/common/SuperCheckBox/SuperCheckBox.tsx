import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckBox.module.scss'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
  {
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange, onChangeChecked,
    className, spanClassName,
    children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

    ...restProps// все остальные пропсы попадут в объект restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    onChangeChecked && onChangeChecked(e.currentTarget.checked)
  }

  // const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

  return (
    <>
      <input
        type={'checkbox'}
        id={'checkbox'}
        name={'checkbox'}
        onChange={onChangeCallback}
        className={s.checkBox}
        disabled={false}

        {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
      />
      {children && <span>{children}</span>}
      <label htmlFor={'checkbox'}></label>
    </>
  )
}

export default SuperCheckbox
