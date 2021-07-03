import React, {useEffect, useState} from "react"
import Table from "../../common/Table/Table"
import s from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {CardPacksType} from "../../types/types";
import {deletePacksTC, getPacksTC} from "../../redux/reducers/packsReducer";
import {Redirect} from "react-router-dom";
import ModalWindow from "../../common/modalWindow/modalWindow";

const PacksList = () => {
  const dispatch = useDispatch()
  const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.packs.cardPacks)
  const _id = useSelector<RootStateType, string | null>(state => state.login._id)
  const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
  const [isMode, setIsMode] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  if (!isAuth) return <Redirect to={'/login'}/>

  const updatePacks = (_id: string) => {
    setIsMode(true)
    // dispatch(updatePacksTC(_id, name))
  }
  const deletePacks = (_id: string) => {
    dispatch(deletePacksTC(_id))
  }

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
              <li onClick={() => updatePacks(el._id)}>Edit</li>
              <li onClick={() => deletePacks(el._id)}>Delete</li>
            </>
          }
        </ul>
      </div>
    )
  })

  const arrTitle = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

  return (
    <div className={`${s.container} ${isMode && s.activeModal}`}>
      <div className={s.packs}>
        <h1>Packs List</h1>

        <Table
          arrTitle={arrTitle}
          packs={packs}
        />
      </div>
      {isMode && <ModalWindow />}
    </div>
  )
}

export default PacksList