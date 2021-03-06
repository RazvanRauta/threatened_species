/**
 *  @author: Razvan Rauta
 *  Date: Oct 15 2021
 *  Time: 10:13
 */

import type { ISpecimen } from '@/types'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList as List } from 'react-window'
import Row from '../Row'
import { createItemData } from '../../utils'
import { useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useWindowSize } from '@/hooks'

interface ListComponentProps {
  species: ISpecimen[]
  loadMore: () => void
  hasMoreResults: boolean
  showCriticalEndangered?: boolean
  defaultRowHeight?: boolean
}

const ListComponent = ({
  species,
  loadMore,
  hasMoreResults,
  showCriticalEndangered,
  defaultRowHeight,
}: ListComponentProps) => {
  const { height = 0, width = 0 } = useWindowSize()
  const { region } = useParams<{ region?: string }>()
  const isMobile = useMediaQuery('(max-width:600px)')

  //To show "No results message"
  const itemCount = species.length
    ? hasMoreResults
      ? species.length + 1
      : species.length
    : species.length + 1
  const itemData = createItemData(
    species,
    region,
    hasMoreResults,
    showCriticalEndangered
  )

  return (
    <InfiniteLoader
      isItemLoaded={(index) => index < species.length}
      itemCount={itemCount}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={width < 768 ? height - 200 : height - 250}
          width={Math.min(1100, Math.max(340, width - 100))}
          itemCount={itemCount}
          itemSize={
            isMobile
              ? showCriticalEndangered
                ? 520
                : 470
              : defaultRowHeight
              ? 250
              : 320
          }
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
