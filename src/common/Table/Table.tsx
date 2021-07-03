import React from "react"
import s from './Table.module.scss'
import {CardPacksType} from "../../types/types";

type PropsType = {
  packs: any
}

const Table: React.FC<PropsType> = ({packs}) => {
  return (
    <div className={s.table}>
      <div className={s.titleBlock}>
        <ul>
          <li>Name</li>
          <li>Cards</li>
          <li>Last Updated</li>
          <li>Created by</li>
          <li>Actions</li>
        </ul>
      </div>

      {packs}

    </div>
  )
}

export default Table