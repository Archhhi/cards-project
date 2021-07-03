import React from "react"
import Table from "../../common/Table/Table"
import s from './Packs.module.scss'
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {PacksListType} from "../../types/types";

const PacksList = () => {
  const packsList = useSelector<RootStateType, PacksListType[]>(state => state.packs.packsList)

  return (
    <div className={s.container}>
      <div className={s.packs}>
        <h1>Packs List</h1>

        <Table
          packs={packsList}
        />
      </div>
    </div>
  )
}

export default PacksList