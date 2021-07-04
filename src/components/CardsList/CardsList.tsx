import React, {useEffect, useState} from "react"
import Table from "../../common/Table/Table"
import s from './Cards.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";
import ModalWindow from "../../common/ModalWindow/ModalWindow";
import {AuthStateType} from "../../redux/reducers/loginReducer";
import SuperInput from "../../common/SuperInput/SuperInput";
import SuperButton from "../../common/SuperButton/SuperButton";
import stylesForButton from "../../common/styles/styles.module.scss";
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../redux/reducers/cardsReducer";

const CardsList = () => {

  const dispatch = useDispatch()
  const {cards, cardsPack_id} = useSelector<RootStateType, any>(state => state.cards)
  const {_id, isAuth} = useSelector<RootStateType, AuthStateType>(state => state.login)
  const [isModeAdd, setIsModeAdd] = useState<boolean>(false)
  const [isModeEdit, setIsModeEdit] = useState<boolean>(false)
  const [isModeDelete, setIsModeDelete] = useState<boolean>(false)
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [id, setID] = useState<string>('')

  useEffect(() => {
    dispatch(getCardsTC(cardsPack_id))
  }, [])

  if (!isAuth) return <Redirect to={'/login'}/>

  const activateModal = (_id: string, e: any, question: string) => {
    setID(_id)
    if(e === 'Edit') {
      setIsModeEdit(true)
    } else if(e === 'Delete') {
      setQuestion(question)
      setIsModeDelete(true)
    } else if(e === 'Add new card') {
      setIsModeAdd(true)
    }
  }
  const addCard = () => {
    dispatch(addCardTC(cardsPack_id, question, answer))
    setIsModeAdd(false)
  }
  const updateCard = (id: string) => {
    dispatch(updateCardTC(cardsPack_id, id, question))
    setIsModeEdit(false)
  }
  const deleteCard = (_id: string) => {
    dispatch(deleteCardTC(cardsPack_id, _id))
    setIsModeDelete(false)
  }

  const rgxp = /\d{4}-\d{2}-\d{2}/

  //@ts-ignore
  const packs = cards.map(el => {
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

  const arrTitle = ['Question', 'Answer', 'Last Updated', 'Grade', 'Actions']

  return (
    <div className={`${s.container} ${isModeEdit && s.activeModal}`}>
      <div className={s.cards}>
        <h1>{}</h1>

        <SuperButton
          className={stylesForButton.loginBtn}
          onClick={(e) => activateModal('', e.currentTarget.innerText, '')}
        >Add new card</SuperButton>

        <Table
          arrTitle={arrTitle}
          packs={packs}
        />
      </div>

      {
        isModeAdd &&
        <ModalWindow
            setIsMode={setIsModeAdd}
            title={'Card Info'}
        >
          <SuperInput
              type={'text'}
              onChangeText={setQuestion}
          />
          <SuperInput
              type={'text'}
              onChangeText={setAnswer}
          />
          <SuperButton
              className={stylesForButton.buttonForModalCancel}
              onClick={() => setIsModeAdd(false)}
          >Cancel</SuperButton>
          <SuperButton
              className={stylesForButton.buttonForModalSave}
              onClick={() => addCard()}
          >Save</SuperButton>
        </ModalWindow>
      }
      {
        isModeEdit &&
        <ModalWindow
            setIsMode={setIsModeEdit}
            title={'Edit Card'}
        >
          <SuperInput
              type={'text'}
              onChangeText={setQuestion}
          />
          <SuperButton
              className={stylesForButton.buttonForModalCancel}
              onClick={() => setIsModeEdit(false)}
          >Cancel</SuperButton>
          <SuperButton
              className={stylesForButton.buttonForModalSave}
              onClick={() => updateCard(id)}
          >Save</SuperButton>
        </ModalWindow>
      }
      {
        isModeDelete &&
        <ModalWindow
            setIsMode={setIsModeDelete}
            title={'Delete Card'}
        >
          <p>
            Do you really want to remove <b>CardQuestion - {question}</b>?
            All cards will be excluded from this course.
          </p>
          <SuperButton
              className={stylesForButton.buttonForModalCancel}
              onClick={() => setIsModeDelete(false)}
          >Cancel</SuperButton>
          <SuperButton
              className={stylesForButton.buttonForModalSave}
              onClick={() => deleteCard(id)}
          >Delete</SuperButton>
        </ModalWindow>
      }
    </div>
  )
}

export default CardsList