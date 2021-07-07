import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInput.module.scss'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  placeholder?: string
  spanClassName?: string
}

const SuperInput: React.FC<SuperInputTextPropsType> = (
  {
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange, onChangeText,
    placeholder,
    onKeyPress, onEnter,
    error,
    className, spanClassName,

    ...restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange
    && onChange(e)
    onChangeText && onChangeText(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);

    onEnter
    && e.key === 'Enter'
    && onEnter()
  }

  return (
    <>
      <input
        type={type}
        className={s.input}
        placeholder={placeholder ? placeholder : 'Enter...'}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        {...restProps}
      />

      <span className={s.errorText}>{error}</span>
    </>
  )
}

export default SuperInput
