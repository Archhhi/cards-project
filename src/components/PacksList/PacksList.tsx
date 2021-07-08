import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react"
import Table from "../../common/Table/Table"
import s from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {
    addPackTC,
    deletePackTC, getPacksByPageNumberTC,
    getPacksTC, getSortedPacksTC,
    PacksStateType, setId, setIsModeAdd, setIsModeDelete,
    setIsModeEdit, setMinMaxCardsValues, setModalText,
    updatePackTC
} from "../../redux/reducers/packsReducer"
import {Redirect} from "react-router-dom"
import {AuthStateType} from "../../redux/reducers/loginReducer"
import SuperButton from "../../common/SuperButton/SuperButton"
import stylesForButton from "../../common/styles/styles.module.scss"
import AddNewPack from "./ModalWindow/AddNewPack";
import EditPack from "./ModalWindow/EditPack";
import DeletePack from "./ModalWindow/DeletePack";
import SuperInput from "../../common/SuperInput/SuperInput";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Pagination from "../../common/Pagination/Pagination";

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const {Handle} = Slider;


const PacksList: React.FC = React.memo(() => {

    const dispatch = useDispatch()


    const {
        cardPacks,
        isModeAdd,
        isModeEdit,
        isModeDelete,
        modalText,
        id,
        page,
        pageCount,
        cardPacksTotalCount,
        settedMinCardsValue,
        settedMaxCardsValue,
        maxCardsCount,
        minCardsCount
    } = useSelector<RootStateType, PacksStateType>(state => state.packs)

    const minValueForRangeComponent = minCardsCount ? minCardsCount : undefined
    const maxValueForRangeComponent = maxCardsCount ? maxCardsCount : undefined

    const [rangeValues, setRangeValues] = useState<any>([settedMinCardsValue, settedMaxCardsValue])


    console.log("settedMinCardsValue=", settedMinCardsValue, "settedMaxCardsValue=", settedMaxCardsValue, "cardPacksTotalCount = ", cardPacksTotalCount)

    const {_id, isAuth} = useSelector<RootStateType, AuthStateType>(state => state.login)
    const [onMode, setOnMode] = useState(false)


    useEffect(() => {
        dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1]))
    }, [])
    console.log("page= ", page,
        "pageCount= ", pageCount,
        "cardPacksTotalCount =", cardPacksTotalCount)


    if (!isAuth) return <Redirect to={'/login'}/>

    const activateModal = (_id: string, e: string, name: string) => {
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

    const myStyle = {
        backgroundColor: onMode ? '#9A91C8' : '#FFFFFF'
    }
    const allStyle = {
        backgroundColor: onMode ? '#FFFFFF' : '#9A91C8'
    }

    const onMyPacks = () => {
        setOnMode(true)
        dispatch(getPacksTC(_id))
        dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1], _id))
    }
    const onAllPacks = () => {
        setOnMode(false)
        dispatch(getPacksTC())
        dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1]))
    }

    const onInputValuesEntered = () => {
        if (onMode){
        dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1], _id))
        } else {
            dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1]))
        }
    }

    const paginate = (page: number) => {
        dispatch(getPacksByPageNumberTC(page, settedMinCardsValue, settedMaxCardsValue,))
    }

    return (
        <div className={s.container}>
            <aside className={s.sidePanel}>
                <div className={s.togglePacks}>
                    <span className={s.titleShow}>Show packs cards</span>
                    <div className={s.toggle}>
                        <span className={s.myPacks} style={myStyle} onClick={onMyPacks}>My</span>
                        <span className={s.allPacks} style={allStyle} onClick={onAllPacks}>All</span>
                    </div>
                </div>

                <div className={s.scrollWrap}>
                    <p>Filter by number of cards</p>
                    <div className={s.inputsWrap}>
                        <Range
                            tipFormatter={value => `${value} cards`}
                            onAfterChange={onInputValuesEntered}
                            allowCross={false}
                            min={minValueForRangeComponent}
                            max={maxValueForRangeComponent}
                            // defaultValue={[0, 20]}
                            onChange={setRangeValues}
                            value={rangeValues}
                        />
                    </div>
                </div>
            </aside>

            <div className={s.packs}>
                <div className={s.containerForTopBlock}>
                    <h1>Packs List</h1>

                    <div className={s.containerForSearchAndBtn}>
                        <div className={s.searchPacks}>
                            <SuperInput
                                type={'text'}
                                placeholder={'Search...'}
                            />
                        </div>

                        <SuperButton
                            className={stylesForButton.addBtn}
                            onClick={(e) => activateModal('', e.currentTarget.innerText, '')}
                        >Add new pack</SuperButton>
                    </div>
                </div>

                <Table
                    type={'pack'}
                    arrTitle={arrTitle}
                    packs={cardPacks}
                    _id={_id}
                    activateModal={activateModal}
                />
                <div className={s.paginationBlock}><Pagination
                    paginate={paginate}
                    page={page}
                    pageCount={pageCount}
                    cardPacksTotalCount={cardPacksTotalCount}/>
                </div>
            </div>

            {isModeAdd && <AddNewPack addPack={addPack}/>}

            {isModeEdit && <EditPack id={id} updatePack={updatePack}/>}

            {isModeDelete && <DeletePack id={id} modalText={modalText} deletePack={deletePack}/>}


        </div>
    )
})

export default PacksList