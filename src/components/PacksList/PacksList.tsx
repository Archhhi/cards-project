import React, {useEffect, useState} from "react"
import Table from "../../common/Table/Table"
import s from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {
  addPackTC,
  deletePackTC, getPacksByPageNumberTC,
  getSortedPacksTC,
  PacksStateType, setId, setIsModeAdd, setIsModeDelete,
  setIsModeEdit, setModalText, setMinMaxCardsValues,
  updatePackTC, setOnMode, setSearchInputValue,
} from "../../redux/reducers/packsReducer"
import {Redirect} from "react-router-dom"
import {AuthStateType} from "../../redux/reducers/loginReducer"
import SuperButton from "../../common/SuperButton/SuperButton"
import stylesForButton from "../../common/styles/styles.module.scss"
import AddNewPack from "./ModalWindow/AddNewPack";
import EditPack from "./ModalWindow/EditPack";
import DeletePack from "./ModalWindow/DeletePack";
import SuperInput from "../../common/SuperInput/SuperInput";
import {debounce} from "../../utils/debounceFunc";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Pagination from "../../common/Pagination/Pagination";

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);


const PacksList: React.FC = React.memo(() => {

  const dispatch = useDispatch()

  const {
    cardPacks,
    isModeAdd,
    isModeEdit,
    isModeDelete,
    modalText,
    id,
    onMode,
    searchInputValue,
    page,
    pageCount,
    cardPacksTotalCount,
    settedMinCardsValue,
    settedMaxCardsValue,
    maxCardsCount,
    minCardsCount
  } = useSelector<RootStateType, PacksStateType>(state => state.packs)
  const {_id, isAuth} = useSelector<RootStateType, AuthStateType>(state => state.login)
  const [rangeValues, setRangeValues] = useState([settedMinCardsValue, settedMaxCardsValue])

  useEffect(() => {
    // cardPacks.length === 0 && dispatch(getPacksTC())
    cardPacks.length === 0 && onMode === 'all' || onMode === 'pending' && dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1]))
  }, [cardPacks])

  useEffect(() => {
    if (onMode === 'all') {
      // dispatch(getPacksTC())
      dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1]))
    } else if (onMode === 'my') {
      // dispatch(getPacksTC(_id))
      dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1], _id))
    }
  }, [searchInputValue])

  if (onMode === 'pending') {
    dispatch(setOnMode('all'))
  }

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

  const myStyle = {
    backgroundColor: onMode === 'my' ? '#9A91C8' : '#FFFFFF'
  }
  const allStyle = {
    backgroundColor: onMode === 'all' || onMode === 'pending' ? '#9A91C8' : '#FFFFFF'
  }

  const onMyPacks = () => {
    dispatch(setOnMode('my'))
    // dispatch(getPacksTC(_id))
    dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1], _id))
  }
  const onAllPacks = () => {
    dispatch(setOnMode('all'))
    // dispatch(getPacksTC())
    dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1]))
  }

  const onInputValuesEntered = () => {
    if (onMode === 'my') {
      dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1], _id))
    } else if (onMode === 'all') {
      dispatch(getSortedPacksTC(rangeValues[0], rangeValues[1]))
    }
  }

  const minValueForRangeComponent = minCardsCount ? minCardsCount : undefined
  const maxValueForRangeComponent = maxCardsCount ? maxCardsCount : undefined

  const paginate = (page: number) => {
    if (onMode === 'all') {
      dispatch(getPacksByPageNumberTC(page, settedMinCardsValue, settedMaxCardsValue))
    } else if (onMode === 'my') {
      dispatch(getPacksByPageNumberTC(page, settedMinCardsValue, settedMaxCardsValue, _id))
    }
  }

  function onChange(value: string) {
    dispatch(setSearchInputValue(value))
  }

  //@ts-ignore
  onChange = debounce(onChange, 500)

  const arrTitle = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']
  return (
    <div className={s.container}>
      <aside className={s.sidePanel}>
        <div className={s.togglePacks}>
          <span className={s.titleShow}>Show packs cards</span>
          <div className={s.toggle}>
            <span className={s.myPacks} style={myStyle} onClick={() => onMyPacks()}>My</span>
            <span className={s.allPacks} style={allStyle} onClick={() => onAllPacks()}>All</span>
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
                onChangeText={(value) => onChange(value)}
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