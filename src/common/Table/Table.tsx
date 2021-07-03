import React from "react"
import s from './Table.module.scss'

type PropsType = {
  arrTitle: string[]
  packs?: any
}

const Table: React.FC<PropsType> = (props) => {

  let titles = [...props.arrTitle].map(t => {
    return (
      <li>{t}</li>
    )
  })

  return (
    <div className={s.table}>
      <div className={s.titleBlock}>
        <ul>
          {titles}
        </ul>
      </div>

      {props.packs && props.packs}
      {}
    </div>
  )
}

export default Table