import {AppActionTypes} from "../store";
import {PacksListType} from "../../types/types";

// Action creators type

// All action types
export type PacksActionTypes = any // fix any

// State type
export type PacksStateType = typeof initialState

// State
const initialState = {
  packsList: [
    {
      _id: '134124124',
      name: 'Pack name',
      cards: 5,
      lastUpdated: '03.07.2021',
      createdBy: 'Arthur Shogenov'
    },
    {
      _id: '124124222',
      name: 'Pack name',
      cards: 5,
      lastUpdated: '03.07.2021',
      createdBy: 'Arthur Shogenov'
    },
    {
      _id: '2512512521',
      name: 'Pack name',
      cards: 5,
      lastUpdated: '03.07.2021',
      createdBy: 'Arthur Shogenov'
    }
  ] as PacksListType[],
}

// Reducer
export const packsReducer = (state = initialState, action: AppActionTypes): PacksStateType => {
  switch (action.type) {

    default:
      return state
  }
}

// Action creators

// Thunk creators