/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 16:19
 */

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import regionsReducer from './red-list/regions/regionsSlice'
import speciesReducer from './red-list/species/speciesSlice'

const store = configureStore({
  reducer: {
    regions: regionsReducer,
    species: speciesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
