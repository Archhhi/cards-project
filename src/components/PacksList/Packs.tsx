import s from "./Packs.module.scss";
import React, {useState} from "react";
import {CardPacksType} from "../../types/types";
import {Redirect} from "react-router-dom";
import {setCardsPackIdAC} from "../../redux/reducers/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

type PropsType = {
  packs?: CardPacksType[]
  _id: string | null
  activateModal: (_id: string, e: any, name: string) => void
}


const Packs: React.FC<PropsType> = React.memo((
  {
    packs,
    _id,
    activateModal
  }
) => {

  const dispatch = useDispatch()
  const cardsPack_id = useSelector<RootStateType, string | null>(state => state.cards.cardsPack_id)
  const [isRedirectCard, setIsRedirectCards] = useState<boolean>(false)

  if (isRedirectCard) return <Redirect to={`/cards/${cardsPack_id}`}/>

  const getCards = (_id: string, name: string) => {
    dispatch(setCardsPackIdAC(_id, name))
    setIsRedirectCards(true)
  }

  const rgxp = /\d{4}-\d{2}-\d{2}/

  return (
    <>
      {
        packs && packs.map(el => {
          return (
            <div className={s.packsList} key={el._id}>
              <ul>
                <li onClick={() => getCards(el._id, el.name)}>{el.name}</li>
                <li>{el.cardsCount}</li>
                <li>{el.updated.toString().match(rgxp)}</li>
                <li>{el.user_name}</li>
                {
                  el.user_id === _id &&
                  <>
                    <li onClick={(e) => activateModal(el._id, e.currentTarget.innerText, '')}>Edit</li>
                    <li onClick={(e) => activateModal(el._id, e.currentTarget.innerText, el.name)}>Delete</li>
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
export default Packs