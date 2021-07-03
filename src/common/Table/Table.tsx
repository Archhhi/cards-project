import React from "react"
import s from './Table.module.scss'
import {PacksListType} from "../../types/types";

type PropsType = {
  packs: PacksListType[]
}

const Table: React.FC<PropsType> = ({packs}) => {

  let packsList = packs.map(el => {
    return (
      <div className={s.packsList} key={el._id}>
        <ul>
          <li>{el.name}</li>
          <li>{el.cards}</li>
          <li>{el.lastUpdated}</li>
          <li>{el.createdBy}</li>
          <li>Delete</li>
          <li>Edit</li>
        </ul>
      </div>
    )
  })

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

      {packsList}

    </div>
  )
}

export default Table