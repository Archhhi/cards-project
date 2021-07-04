import React, {useEffect, useState} from "react"
import Table from "../../common/Table/Table"
import s from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {CardPacksType} from "../../types/types";
import {addPackTC, deletePackTC, getPacksTC, updatePackTC} from "../../redux/reducers/packsReducer";
import {Redirect} from "react-router-dom";
import ModalWindow from "../../common/ModalWindow/ModalWindow";
import {AuthStateType} from "../../redux/reducers/loginReducer";
import SuperInput from "../../common/SuperInput/SuperInput";
import SuperButton from "../../common/SuperButton/SuperButton";
import stylesForButton from "../../common/styles/styles.module.scss";

const PacksList = () => {

  const dispatch = useDispatch()
  const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.packs.cardPacks)
  const {_id, isAuth} = useSelector<RootStateType, AuthStateType>(state => state.login)
  const [isModeAdd, setIsModeAdd] = useState<boolean>(false)
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false)
  const [isModeDelete, setIsModeDelete] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  const [id, setID] = useState<string>('')

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  if (!isAuth) return <Redirect to={'/login'}/>

  const activateModal = (_id: string, e: any, name: string) => {
    setID(_id)
    if(e === 'Edit') {
      setIsModeEdit(true)
    } else if(e === 'Delete') {
      setModalText(name)
      setIsModeDelete(true)
    } else if(e === 'Add new pack') {
      setIsModeAdd(true)
    }
  }
  const addPack = () => {
    dispatch(addPackTC(modalText))
    setIsModeAdd(false)
  }
  const updatePack = (id: string) => {
    dispatch(updatePackTC(id, modalText))
    setIsModeEdit(false)
  }
  const deletePack = (_id: string) => {
    dispatch(deletePackTC(_id))
    setIsModeDelete(false)
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
              <li onClick={(e) => activateModal(el._id, e.currentTarget.innerText, '')}>Edit</li>
              <li onClick={(e) => activateModal(el._id, e.currentTarget.innerText, el.name)}>Delete</li>
            </>
          }
        </ul>
      </div>
    )
  })

  const arrTitle = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

  return (
    <div className={`${s.container} ${isModeEdit && s.activeModal}`}>
      <div className={s.packs}>
        <h1>Packs List</h1>

        <SuperButton
          className={stylesForButton.loginBtn}
          onClick={(e) => activateModal('', e.currentTarget.innerText, '')}
        >Add new pack</SuperButton>

        <Table
          arrTitle={arrTitle}
          packs={packs}
        />
      </div>

      {
        isModeAdd &&
        <ModalWindow
            setIsMode={setIsModeAdd}
            setModalInputText={setModalText}
            title={'Add new Pack'}
        >
          <SuperInput
              type={'text'}
              onChangeText={setModalText}
          />
          <SuperButton
              className={stylesForButton.buttonForModalCancel}
              onClick={() => setIsModeAdd(false)}
          >Cancel</SuperButton>
          <SuperButton
              className={stylesForButton.buttonForModalSave}
              onClick={() => addPack()}
          >Add</SuperButton>
        </ModalWindow>
      }
      {
        isModeEdit &&
        <ModalWindow
            setIsMode={setIsModeEdit}
            setModalInputText={setModalText}
            title={'Edit Pack'}
        >
          <SuperInput
              type={'text'}
              onChangeText={setModalText}
          />
          <SuperButton
              className={stylesForButton.buttonForModalCancel}
              onClick={() => setIsModeEdit(false)}
          >Cancel</SuperButton>
          <SuperButton
              className={stylesForButton.buttonForModalSave}
              onClick={() => updatePack(id)}
          >Save</SuperButton>
        </ModalWindow>
      }
      {
        isModeDelete &&
        <ModalWindow
            setIsMode={setIsModeDelete}
            setModalInputText={setModalText}
            title={'Delete Pack'}
        >
          <p>
            Do you really want to remove <b>PackName - {modalText}</b>?
            All cards will be excluded from this course.
          </p>
          <SuperButton
              className={stylesForButton.buttonForModalCancel}
              onClick={() => setIsModeDelete(false)}
          >Cancel</SuperButton>
          <SuperButton
              className={stylesForButton.buttonForModalSave}
              onClick={() => deletePack(id)}
          >Delete</SuperButton>
        </ModalWindow>
      }
    </div>
  )
}

export default PacksList