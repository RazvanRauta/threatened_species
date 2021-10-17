/**
 *  @author: Razvan Rauta
 *  Date: Oct 17 2021
 *  Time: 13:32
 */

import {
  mockServer,
  mockedRegionsResponse,
  renderWithProviders,
} from '@/utils/testHelpers'

import IndexPageComponent from './component'
import { REGIONS_LIST_PATH } from '@/api/red-list-api'
import { rest } from 'msw'
import { waitFor } from '@testing-library/react'

describe('Testing index page', () => {
  beforeAll(() => {
    mockServer.listen()
  })

  afterEach(() => {
    mockServer.resetHandlers()
    jest.clearAllMocks()
  })

  afterAll(() => mockServer.close())

  it('should updated store and render index page', async () => {
    mockServer.use(
      ...[
        rest.get(
          `${process.env.REACT_APP_API_URL}${REGIONS_LIST_PATH}`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ ...mockedRegionsResponse }))
          }
        ),
      ]
    )

    const { findByText, mockStore } = renderWithProviders(
      <IndexPageComponent />
    )

    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
      expect(mockStore.getState().regions.regions).toEqual(
        mockedRegionsResponse.results
      )
    })

    //Header
    expect(
      await findByText(/Red List of Threatened Species/i)
    ).toBeInTheDocument()
    //Grid Card
    expect(await findByText(/Europe/i)).toBeInTheDocument()
    //Footer
    expect(await findByText(/Copyright ©/i)).toBeInTheDocument()
  })

  it('should should handle error', async () => {
    mockServer.use(
      ...[
        rest.get(
          `${process.env.REACT_APP_API_URL}${REGIONS_LIST_PATH}`,
          (req, res, ctx) => {
            return res(ctx.status(404), ctx.json({}))
          }
        ),
      ]
    )

    const { findByText, findByTestId } = renderWithProviders(
      <IndexPageComponent />
    )

    //Header
    expect(
      await findByText(/Red List of Threatened Species/i)
    ).toBeInTheDocument()
    //Alert
    expect(await findByTestId('snack-bar-alert')).toBeInTheDocument()
    //Footer
    expect(await findByText(/Copyright ©/i)).toBeInTheDocument()
  })
})
