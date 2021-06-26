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
    type,
    onChange, onChangeChecked,
    className, spanClassName,
    children,

    ...restProps
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

        {...restProps}
      />
      {children && <span>{children}</span>}
      <label htmlFor={'checkbox'}/>
    </>
  )
}

export default SuperCheckbox
