import React, {useEffect} from "react"
import Table from "../../common/Table/Table"
import s from './Cards.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {NavLink, Redirect} from "react-router-dom"
import ModalWindow from "../../common/ModalWindow/ModalWindow"
import {AuthStateType} from "../../redux/reducers/loginReducer"
import SuperInput from "../../common/SuperInput/SuperInput"
import SuperButton from "../../common/SuperButton/SuperButton"
import stylesForButton from "../../common/styles/styles.module.scss"
import {
  addCardTC,
  CardsStateType,
  deleteCardTC,
  getCardsTC, setQuestion,
  updateCardTC
} from "../../redux/reducers/cardsReducer"
import styles from '../../common/styles/ContainerForTopBlocks.module.scss'
import {PacksStateType, setId, setIsModeAdd, setIsModeDelete, setIsModeEdit} from "../../redux/reducers/packsReducer";
import AddNewCard from "./ModalWindow/AddNewCard";
import EditCard from "./ModalWindow/EditCard";
import DeleteCard from "./ModalWindow/DeleteCard";

const CardsList: React.FC = React.memo(() => {

  const dispatch = useDispatch()

  const {
    cards,
    cardsPack_id,
    packName,
    question,
    answer
  } = useSelector<RootStateType, CardsStateType>(state => state.cards)
  const {
    isModeAdd,
    isModeEdit,
    isModeDelete,
    modalText,
    id,
  } = useSelector<RootStateType, PacksStateType>(state => state.packs)
  const {_id, isAuth} = useSelector<RootStateType, AuthStateType>(state => state.login)

  useEffect(() => {
    dispatch(getCardsTC(cardsPack_id!))
  }, [])

  if (!isAuth) return <Redirect to={'/login'}/>

  const activateModal = (_id: string, e: any, question: string) => {
    dispatch(setId(_id))
    if (e === 'Edit') {
      dispatch(setIsModeEdit(true))
    } else if (e === 'Delete') {
      dispatch(setQuestion(question))
      dispatch(setIsModeDelete(true))
    } else if (e === 'Add new card') {
      dispatch(setIsModeAdd(true))
    }
  }
  const addCard = () => {
    dispatch(addCardTC(cardsPack_id!, question, answer))
    dispatch(setIsModeAdd(false))
  }
  const updateCard = (id: string) => {
    dispatch(updateCardTC(cardsPack_id!, id, question))
    dispatch(setIsModeEdit(false))
  }
  const deleteCard = (_id: string) => {
    dispatch(deleteCardTC(cardsPack_id!, _id))
    dispatch(setIsModeDelete(false))
  }

  const arrTitle = ['Question', 'Answer', 'Last Updated', 'Grade', 'Actions']
  return (
    <div className={`${s.container} ${isModeEdit && s.activeModal}`}>
      <div className={s.cards}>
        <div className={s.containerForTopBlocks}>
          <NavLink to={'/packs'}>
            <div className={s.arrow}>
              <div/>
            </div>
          </NavLink>

          <h1>{packName}</h1>

          <SuperButton
            className={stylesForButton.addBtn}
            onClick={(e) => activateModal('', e.currentTarget.innerText, '')}
          >Add new card</SuperButton>
        </div>

        <Table
          type={'card'}
          arrTitle={arrTitle}
          cards={cards}
          _id={_id}
          activateModal={activateModal}
        />
      </div>

      {isModeAdd && <AddNewCard addCard={addCard}/>}

      {isModeEdit && <EditCard id={id} updateCard={updateCard}/>}
      {isModeDelete && <DeleteCard id={id} deleteCard={deleteCard}/>}
    </div>
  )
})

export default CardsList