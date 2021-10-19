/**
 *  @author: Razvan Rauta
 *  Date: Oct 19 2021
 *  Time: 10:10
 */

import {
  COMMON_NAME_PATH,
  MEASURES_BY_ID_PATH,
  REGIONS_LIST_PATH,
  SPECIES_BY_REGION_PATH,
} from '@/api/red-list-api'
import { fireEvent, waitFor } from '@testing-library/react'
import { mockServer, renderWithProviders } from '@/utils/testHelpers'
import {
  mockedApiErrorResponse,
  mockedCommonNameResponse,
  mockedConservationMeasurersResponse,
  mockedNoMoreResultsResponse,
  mockedRegionsResponse,
  mockedRegionsSpeciesResponse,
} from '@/utils/mocks'

import ReactRouter from 'react-router'
import RegionsSpeciesComponent from './RegionsSpecies.component'
import { act } from 'react-dom/test-utils'
import { rest } from 'msw'

describe('Testing Region Species page', () => {
  it('should render Region Species Component', async () => {
    mockServer.use(
      ...[
        rest.get(
          `${process.env.REACT_APP_API_URL}${REGIONS_LIST_PATH}`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ ...mockedRegionsResponse }))
          }
        ),
        rest.get(
          `${process.env.REACT_APP_API_URL}${SPECIES_BY_REGION_PATH}europe/page/0`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ ...mockedRegionsSpeciesResponse })
            )
          }
        ),
        rest.get(
          `${process.env.REACT_APP_API_URL}${SPECIES_BY_REGION_PATH}europe/page/*`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ ...mockedNoMoreResultsResponse })
            )
          }
        ),
        rest.get(
          `${process.env.REACT_APP_API_URL}${COMMON_NAME_PATH}*`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ ...mockedCommonNameResponse })
            )
          }
        ),
        rest.get(
          `${process.env.REACT_APP_API_URL}${MEASURES_BY_ID_PATH}*`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ ...mockedConservationMeasurersResponse })
            )
          }
        ),
      ]
    )

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ region: 'europe' })

    const { findByText, mockStore, getByTestId, queryByText } =
      renderWithProviders(<RegionsSpeciesComponent />)

    await waitFor(
      () => {
        expect(mockStore.dispatch).toHaveBeenCalledTimes(3)
        expect(mockStore.getState().regions.regions).toEqual(
          mockedRegionsResponse.results
        )
        expect(
          mockStore.getState().species.allSpecies[
            mockedRegionsSpeciesResponse.region_identifier
          ]
        ).toBeDefined()
      },
      { timeout: 2 * 1000, interval: 100 }
    )

    //Header
    expect(
      await findByText(/Red List of Threatened Species/i)
    ).toBeInTheDocument()
    //Footer
    expect(await findByText(/Copyright ©/i)).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(getByTestId('tab-mammals'))

      expect(await findByText(/African Savanna Elephant/i)).toBeInTheDocument()
      expect(queryByText('i, area protection')).not.toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(getByTestId('tab-cr'))

      expect(await findByText(/African Savanna Elephant/i)).toBeInTheDocument()
      expect(await findByText(/Site\/area protection/i)).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(getByTestId('tab-all-species'))

      expect(await findByText(/African Savanna Elephant/i)).toBeInTheDocument()
      expect(queryByText('i, area protection')).not.toBeInTheDocument()
    })
  })
})

it('should handle error', async () => {
  mockServer.use(
    ...[
      rest.get(
        `${process.env.REACT_APP_API_URL}${REGIONS_LIST_PATH}`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ ...mockedRegionsResponse }))
        }
      ),
      rest.get(
        `${process.env.REACT_APP_API_URL}/species/region/europe/page/*`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ ...mockedApiErrorResponse }))
        }
      ),
    ]
  )

  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ region: 'europe' })

  await act(async () => {
    const { findByText, mockStore, getByTestId } = renderWithProviders(
      <RegionsSpeciesComponent />
    )

    await waitFor(
      () => {
        expect(mockStore.dispatch).toHaveBeenCalledTimes(3)
        expect(
          mockStore.getState().species.allSpecies[
            mockedRegionsSpeciesResponse.region_identifier
          ]
        ).toEqual({
          criticalEndangeredSpecies: [],
          mammalSpecies: [],
          noMoreResults: true,
          species: [],
        })
      },
      { timeout: 2 * 1000, interval: 100 }
    )

    expect(await findByText(/No results in this category/i)).toBeInTheDocument()
    expect(getByTestId('snack-bar-alert')).toBeInTheDocument()
    //Header
    expect(
      await findByText(/Red List of Threatened Species/i)
    ).toBeInTheDocument()
    //Footer
    expect(await findByText(/Copyright ©/i)).toBeInTheDocument()
  })
})
