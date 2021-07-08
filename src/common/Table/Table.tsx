import React from "react"
import s from './Table.module.scss'
import Cards from "../../components/CardsList/Cards";
import {CardPacksType, CardsType} from "../../types/types";
import Packs from "../../components/PacksList/Packs";

type PropsType = {
  type: string
  arrTitle: string[]
  packs?: CardPacksType[]
  cards?: CardsType[]
  _id: string | null
  activateModal: any
}

const Table: React.FC<PropsType> = (props) => {

  let titles = [...props.arrTitle].map((t, index) => {
    return (
      <li key={index}>{t}</li>
    )
  })

  return (
    <div className={s.table}>
      <div className={s.titleBlock}>
        <ul>
          {titles}
        </ul>
      </div>

      {props.type === 'pack' &&
        <Packs packs={props.packs} _id={props._id} activateModal={props.activateModal}/>
      }
      {props.type === 'card' &&
        <Cards cards={props.cards} _id={props._id} activateModal={props.activateModal}/>
      }
    </div>
  )
}

export default Table