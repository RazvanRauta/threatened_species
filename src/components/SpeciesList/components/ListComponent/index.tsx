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
import { useWindowSize } from '@/hooks'

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
  const { height = 0, width = 0 } = useWindowSize()
  const { region } = useParams<{ region?: string }>()

  const itemCount = hasMoreResults ? species.length + 1 : species.length
  const itemData = createItemData(species, region, showCriticalEndangered)

  return (
    <InfiniteLoader
      isItemLoaded={(index) => index < species.length}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={width < 768 ? height - 300 : height - 250}
          width={Math.min(1200, Math.max(320, width - 100))}
          itemCount={itemCount}
          itemSize={320}
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
