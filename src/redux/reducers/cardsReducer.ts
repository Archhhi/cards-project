import {AppActionTypes, AppDispatch, RootStateType, ThunkActionType} from "../store";
import {CardsType} from "../../types/types";
import {cardsAPI, ResponseCardsGetType} from "../../api/api";

// Action creators type
export type CardsActionType = ReturnType<typeof setCardsAC>
export type CardsPackIDType = ReturnType<typeof setCardsPackIdAC>
export type QuestionType = ReturnType<typeof setQuestion>
export type AnswerType = ReturnType<typeof setAnswer>
export type RandomNumberType = ReturnType<typeof setRandomNumber>
export type SearchInputCardValueType = ReturnType<typeof setSearchInputCardValue>
export type SetOnModeType = ReturnType<typeof setOnModeCards>

// All action types
export type CardsActionTypes = CardsActionType
    | CardsPackIDType
    | QuestionType
    | AnswerType
    | RandomNumberType
    | SearchInputCardValueType
    | SetOnModeType

// State type
export type CardsStateType = typeof initialState

// State
const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: null as null | number,
    maxGrade: null as null | number,
    minGrade: null as null | number,
    page: null as null | number,
    pageCount: null as null | number,
    packUserId: null as null | string,
    token: null as null | string,
    tokenDeathTime: null as null | number,

    cardsPack_id: null as null | string,
    packName: null as null | string,

    question: '' as string,
    answer: '' as string,
    grade: null as null | number,
    searchInputCardValue: '' as string,
    onMode: false
}

// Reducer
export const cardsReducer = (state = initialState, action: AppActionTypes): CardsStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state,
                ...action.payload,
            }
        case 'SET_CARDS_PACK_ID':
            return {
                ...state,
                cardsPack_id: action._id,
                packName: action.name
            }
        case 'SET_QUESTION':
            return {
                ...state,
                question: action.question
            }
        case 'SET_ANSWER':
            return {
                ...state,
                answer: action.answer
            }
        case 'SET_RANDOM_NUMBER':
            return {
                ...state,
                grade: action.grade
            }
        case 'SET_SEARCH_INPUT_CARD_VALUE':
            return {
                ...state,
                searchInputCardValue: action.value
            }
        case 'SET_ON_MODE_CARDS':
            return {
                ...state,
                onMode: action.mode
            }
        default:
            return state
    }
}

// Action creators
export const setCardsAC = (data: ResponseCardsGetType) => {
    return {
        type: 'SET_CARDS', payload: data
    } as const
}
export const setCardsPackIdAC = (_id: string, name: string) => {
    return {
        type: 'SET_CARDS_PACK_ID', _id, name
    } as const
}
export const setQuestion = (question: string) => {
    return {
        type: 'SET_QUESTION', question
    } as const
}
export const setAnswer = (answer: string) => {
    return {
        type: 'SET_ANSWER', answer
    } as const
}
export const setRandomNumber = (grade: number) => {
    return {
        type: 'SET_RANDOM_NUMBER', grade
    } as const
}
export const setSearchInputCardValue = (value: string) => {
    return {
        type: 'SET_SEARCH_INPUT_CARD_VALUE', value
    } as const
}
export const setOnModeCards = (mode: boolean) => {
    return {
        type: 'SET_ON_MODE_CARDS', mode
    } as const
}

// Thunk creators
export const getCardsTC = (_id?: string | null): ThunkActionType =>
    async (dispatch: AppDispatch, getState: () => RootStateType) => {
        const state = getState().cards
        try {
            const response = await cardsAPI.getCards(_id, null, null, state.searchInputCardValue)
            dispatch(setCardsAC(response.data))
        } catch (e) {
            console.log(JSON.stringify(e))
        }
    }
export const getCardsByPageNumberTC = (page: number, _id?: string | null): ThunkActionType =>
    async (dispatch: AppDispatch, getState: () => RootStateType) => {
        const state = getState().cards
        try {
            const response = await cardsAPI.getCardsByPageNumber(page, _id, null, state.searchInputCardValue)
            dispatch(setCardsAC(response.data))
        } catch (e) {
            console.log(JSON.stringify(e))
        }
    }
export const addCardTC = (cardsPack_id: string, question: string, answer: string): ThunkActionType =>
    async (dispatch: AppDispatch) => {
        let rand = 1 - 0.5 + Math.random() * (5 - 1 + 1)
        let grade = Math.round(rand)
        try {
            await cardsAPI.addCard(cardsPack_id, question, answer, grade)
            dispatch(getCardsTC(cardsPack_id))
        } catch (e) {
            console.log(JSON.stringify(e))
        }
    }
export const updateCardTC = (cardsPack_id: string, _id: string, question: string, answer: string): ThunkActionType =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsAPI.updateCard(_id, question, answer)
            dispatch(getCardsTC(cardsPack_id))
        } catch (e) {
            console.log(JSON.stringify(e))
        }
    }
export const deleteCardTC = (cardsPack_id: string, _id: string): ThunkActionType =>
    async (dispatch: AppDispatch) => {
        try {
            await cardsAPI.deleteCard(_id)
            dispatch(getCardsTC(cardsPack_id))
        } catch (e) {
            console.log(JSON.stringify(e))
        }
    }