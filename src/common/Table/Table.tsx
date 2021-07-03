import React from "react"
import s from './Table.module.scss'

type PropsType = {
  name: string
  cards: string
  updated: string
  created: string
  action: string
  packs: any
}

const Table: React.FC<PropsType> = (props) => {
  return (
    <div className={s.table}>
      <div className={s.titleBlock}>
        <ul>
          <li>{props.name}</li>
          <li>{props.cards}</li>
          <li>{props.updated}</li>
          <li>{props.created}</li>
          <li>{props.action}</li>
        </ul>
      </div>

      {props.packs}

    </div>
  )
}

export default Table