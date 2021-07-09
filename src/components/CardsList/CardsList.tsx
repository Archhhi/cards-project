import React, {useEffect} from "react"
import Table from "../../common/Table/Table"
import s from './Cards.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {NavLink, Redirect, useParams} from "react-router-dom"
import {AuthStateType} from "../../redux/reducers/loginReducer"
import SuperButton from "../../common/SuperButton/SuperButton"
import stylesForButton from "../../common/styles/styles.module.scss"
import {
    addCardTC,
    CardsStateType,
    deleteCardTC, getCardsByPageNumberTC,
    getCardsTC, setOnModeCards, setQuestion, setSearchInputCardValue,
    updateCardTC
} from "../../redux/reducers/cardsReducer"
import {
    getPacksByPageNumberTC,
    PacksStateType,
    setId,
    setIsModeAdd,
    setIsModeDelete,
    setIsModeEdit
} from "../../redux/reducers/packsReducer";
import AddNewCard from "./ModalWindow/AddNewCard";
import EditCard from "./ModalWindow/EditCard";
import DeleteCard from "./ModalWindow/DeleteCard";
import SuperInput from "../../common/SuperInput/SuperInput";
import {debounce} from "../../utils/debounceFunc";
import Pagination from "../../common/Pagination/Pagination";

const CardsList: React.FC = React.memo(() => {

    const dispatch = useDispatch()

    const {
        cards,
        packName,
        question,
        answer,
        searchInputCardValue,
        onMode,
        cardsTotalCount,
        page,
        pageCount
    } = useSelector<RootStateType, CardsStateType>(state => state.cards)
    const {
        isModeAdd,
        isModeEdit,
        isModeDelete,
        id
    } = useSelector<RootStateType, PacksStateType>(state => state.packs)
    const {_id, isAuth} = useSelector<RootStateType, AuthStateType>(state => state.login)
    const {cardsPack_id}: any = useParams()
    useEffect(() => {
        cards.length === 0 && dispatch(getCardsTC(cardsPack_id!))
    }, [cards])

    useEffect(() => {
        onMode && dispatch(getCardsTC(cardsPack_id))
    }, [searchInputCardValue])

    if (!onMode) {
        dispatch(setOnModeCards(true))
    }

    if (!isAuth) return <Redirect to={'/login'}/>

    const activateModal = (_id: string, event: string, question: string) => {
        dispatch(setId(_id))
        if (event === 'Edit') {
            dispatch(setIsModeEdit(true))
        } else if (event === 'Delete') {
            dispatch(setQuestion(question))
            dispatch(setIsModeDelete(true))
        } else if (event === 'Add new card') {
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

    function onChange(value: string) {
        dispatch(setSearchInputCardValue(value))
    }

    const paginate = (page: number) => {
        // if (onMode) {
            dispatch(getCardsByPageNumberTC(page, cardsPack_id))
        // } else {
        //     dispatch(getPacksByPageNumberTC(page, settedMinCardsValue, settedMaxCardsValue, _id))
        // }
    }

    //@ts-ignore
    onChange = debounce(onChange, 500)

    const arrTitle = ['Question', 'Answer', 'Last Updated', 'Grade', 'Actions']
    return (
        <div className={`${s.contaciner} ${isModeEdit && s.activeModal}`}>
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

                <div className={s.searchPacks}>
                    <SuperInput
                        type={'text'}
                        placeholder={'Search...'}
                        onChangeText={(value) => onChange(value)}
                    />
                </div>

                <Table
                    type={'card'}
                    arrTitle={arrTitle}
                    cards={cards}
                    _id={_id}
                    activateModal={activateModal}
                />
                <div className={s.pagination}><Pagination page={page} pageCount={pageCount} cardPacksTotalCount={cardsTotalCount}
                                 paginate={paginate}/></div>

            </div>

            {isModeAdd && <AddNewCard addCard={addCard}/>}
            {isModeEdit && <EditCard id={id} updateCard={updateCard}/>}
            {isModeDelete && <DeleteCard id={id} deleteCard={deleteCard}/>}
        </div>
    )
})

export default CardsList