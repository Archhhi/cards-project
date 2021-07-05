import React, {useEffect} from "react"
import Table from "../../common/Table/Table"
import s from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {
  addPackTC,
  deletePackTC,
  getPacksTC,
  PacksStateType, setId, setIsModeAdd, setIsModeDelete,
  setIsModeEdit, setModalText,
  updatePackTC
} from "../../redux/reducers/packsReducer"
import {Redirect} from "react-router-dom"
import {AuthStateType} from "../../redux/reducers/loginReducer"
import SuperButton from "../../common/SuperButton/SuperButton"
import stylesForButton from "../../common/styles/styles.module.scss"
import styles from '../../common/styles/ContainerForTopBlocks.module.scss'
import AddNewPack from "./ModalWindow/AddNewPack";
import EditPack from "./ModalWindow/EditPack";
import DeletePack from "./ModalWindow/DeletePack";

const PacksList: React.FC = React.memo(() => {

  const dispatch = useDispatch()

  const {
    cardPacks,
    isModeAdd,
    isModeEdit,
    isModeDelete,
    modalText,
    id
  } = useSelector<RootStateType, PacksStateType>(state => state.packs)
  const {_id, isAuth} = useSelector<RootStateType, AuthStateType>(state => state.login)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  if (!isAuth) return <Redirect to={'/login'}/>

  const activateModal = (_id: string, e: any, name: string) => {
    dispatch(setId(_id))
    if (e === 'Edit') {
      dispatch(setIsModeEdit(true))
    } else if (e === 'Delete') {
      dispatch(setModalText(name))
      dispatch(setIsModeDelete(true))
    } else if (e === 'Add new pack') {
      dispatch(setIsModeAdd(true))
    }
  }
  const addPack = () => {
    dispatch(addPackTC(modalText))
    dispatch(setIsModeAdd(false))
  }
  const updatePack = (id: string) => {
    dispatch(updatePackTC(id, modalText))
    dispatch(setIsModeEdit(false))
  }
  const deletePack = (_id: string) => {
    dispatch(deletePackTC(_id))
    dispatch(setIsModeDelete(false))
  }

  const arrTitle = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

  return (
    <div className={`${s.container} ${isModeEdit && s.activeModal}`}>
      <div className={s.packs}>
        <div className={styles.containerForTopBlocks}>
          <h1>Packs List</h1>

          <SuperButton
            className={stylesForButton.addBtn}
            onClick={(e) => activateModal('', e.currentTarget.innerText, '')}
          >Add new pack</SuperButton>
        </div>

        <Table
          type={'pack'}
          arrTitle={arrTitle}
          packs={cardPacks}
          _id={_id}
          activateModal={activateModal}
        />
      </div>

      {isModeAdd && <AddNewPack addPack={addPack}/>}

      {isModeEdit && <EditPack id={id} updatePack={updatePack}/>}

      {isModeDelete && <DeletePack id={id} modalText={modalText} deletePack={deletePack}/>}
    </div>
  )
})

export default PacksList