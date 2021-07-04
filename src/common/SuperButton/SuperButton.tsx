import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
  {
    red, className,
    ...restProps
  }
) => {

  return (
    <button
      className={`${className}`}
      {...restProps}
    />
  )
}

export default SuperButton