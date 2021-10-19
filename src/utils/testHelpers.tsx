/**
 *  @author: Razvan Rauta
 *  Date: Oct 17 2021
 *  Time: 13:22
 */

import regionsReducer, {
  initialState as regionsInitialState,
} from '@/store/red-list/regions/regionsSlice'
import speciesReducer, {
  initialState as speciesInitialState,
} from '@/store/red-list/species/speciesSlice'

import Layout from '@/layout'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import { RootState } from '@/store'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { setupServer } from 'msw/node'

export const rootInitialState: RootState = {
  regions: regionsInitialState,
  species: speciesInitialState,
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = rootInitialState,
    store = configureStore({
      reducer: { regions: regionsReducer, species: speciesReducer },
      preloadedState: rootInitialState,
    }),
    ...renderOptions
  } = {}
) => {
  const origDispatch = store.dispatch
  //@ts-expect-error
  store.dispatch = jest.fn(origDispatch)

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter>
        <Provider store={store}>
          <Layout>{children}</Layout>
        </Provider>
      </MemoryRouter>
    )
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    mockStore: store,
  }
}

export const mockServer = setupServer()
