/**
 *  @author: Razvan Rauta
 *  Date: Oct 15 2021
 *  Time: 10:13
 */

import type { ISpecimen } from '@/types'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import {
  areEqual,
  FixedSizeList as List,
  ListChildComponentProps,
} from 'react-window'
import memoize from 'memoize-one'
import InfiniteLoader from 'react-window-infinite-loader'
import RowComponent from '../RowComponent'

const Row = memo(({ data, index, style }: ListChildComponentProps) => {
  const { species, region, showCriticalEndangered } = data
  return (
    <RowComponent
      specimen={species[index]}
      style={style}
      loading={index === species.length}
      region={region}
      isEndangered={showCriticalEndangered}
    />
  )
}, areEqual)

const createItemData = memoize(
  (
    species: ISpecimen[],
    region: string | undefined,
    showCriticalEndangered: boolean
  ) => ({
    species,
    region,
    showCriticalEndangered,
  })
)

interface ListComponentProps {
  species: ISpecimen[]
  loadMore: () => void
  hasMoreResults: boolean
  showCriticalEndangered: boolean
}

const ListComponent = ({
  species,
  loadMore,
  hasMoreResults,
  showCriticalEndangered,
}: ListComponentProps) => {
  const itemCount = hasMoreResults ? species.length + 1 : species.length

  const { region } = useParams<{ region?: string }>()

  const itemData = createItemData(species, region, showCriticalEndangered)

  return (
    <InfiniteLoader
      isItemLoaded={(index) => index < species.length}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={650}
          width={1200}
          itemCount={itemCount}
          itemSize={250}
          itemData={itemData}
          onItemsRendered={onItemsRendered}
          ref={ref}
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  )
}

export default ListComponent
