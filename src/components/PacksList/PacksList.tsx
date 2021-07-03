import React, {useEffect} from "react"
import Table from "../../common/Table/Table"
import s from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {CardPacksType} from "../../types/types";
import {getPacksTC} from "../../redux/reducers/packsReducer";
import {Redirect} from "react-router-dom";

const PacksList = () => {
  const dispatch = useDispatch()
  const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.packs.cardPacks)
  const _id = useSelector<RootStateType, string | null>(state => state.login._id)
  const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  if (!isAuth) return <Redirect to={'/login'}/>

  const rgxp = /\d{4}-\d{2}-\d{2}/

  const packs = cardPacks.map(el => {
    return (
      <div className={s.packsList} key={el._id}>
        <ul>
          <li>{el.name}</li>
          <li>{el.cardsCount}</li>
          <li>{el.updated.toString().match(rgxp)}</li>
          <li>{el.created.toString().match(rgxp)}</li>
          {
            el.user_id === _id &&
            <>
              <li>Edit</li>
              <li>Delete</li>
            </>
          }
        </ul>
      </div>
    )
  })

  return (
    <div className={s.container}>
      <div className={s.packs}>
        <h1>Packs List</h1>

        <Table
          name={'Name'}
          cards={'Cards'}
          updated={'Last Updated'}
          created={'Created by'}
          action={'Actions'}
          packs={packs}
        />
      </div>
    </div>
  )
}

export default PacksList