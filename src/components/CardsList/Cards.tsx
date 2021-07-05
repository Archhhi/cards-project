import React from "react"
import s from "./Cards.module.scss";
import {CardsType} from "../../types/types";

type PropsType = {
  cards?: CardsType[]
  _id: string | null
  activateModal: (_id: string, e: any, question: string) => void
}


const Cards: React.FC<PropsType> = React.memo((
  {
    cards,
    _id,
    activateModal
  }
) => {

  const rgxp = /\d{4}-\d{2}-\d{2}/

  return (
    <>
      {
        cards && cards.map(el => {
          return (
            <div className={s.packsList} key={el._id}>
              <ul>
                <li>{el.question}</li>
                <li>{el.answer}</li>
                <li>{el.updated.toString().match(rgxp)}</li>
                <li>{el.grade}</li>
                {
                  el.user_id === _id &&
                  <>
                    <li onClick={(e) => activateModal(el._id, e.currentTarget.innerText, '')}>Edit</li>
                    <li onClick={(e) => activateModal(el._id, e.currentTarget.innerText, el.question)}>Delete</li>
                  </>
                }
              </ul>
            </div>
          )
        })
      }
    </>
  )
})

export default Cards