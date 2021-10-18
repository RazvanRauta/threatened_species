/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 17:44
 */

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from '@mui/material'
import { Theme, styled } from '@mui/material/styles'

import Africa from '@/assets/images/africa.svg'
import Asia from '@/assets/images/asia.svg'
import Europe from '@/assets/images/europe.svg'
import Global from '@/assets/images/global.svg'
import { IRegion } from '@/types'
import { Link } from 'react-router-dom'
import lowerCase from 'lodash/lowerCase'

const StyledLink = styled(Link)`
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: inherit;
`

interface Props {
  region: IRegion
}

const RegionCard = ({ region }: Props) => {
  let imageSrc = ''

  switch (true) {
    case new RegExp(/africa/).test(lowerCase(region.name)): {
      imageSrc = Africa
      break
    }
    case new RegExp(/europe/).test(lowerCase(region.name)): {
      imageSrc = Europe
      break
    }
    case new RegExp(/asia/).test(lowerCase(region.name)): {
      imageSrc = Asia
      break
    }

    default: {
      imageSrc = Global
    }
  }

  return (
    <Box sx={{ minWidth: 300 }}>
      <Card
        variant='outlined'
        sx={{
          ':hover': {
            borderColor: (theme: Theme) => theme.palette.secondary.main,
          },
        }}
      >
        <StyledLink to={`/species/${region.identifier}`}>
          <CardHeader title={region.name} />
          <CardMedia
            component='img'
            height='100'
            alt={region.name}
            image={imageSrc}
            sx={{
              '&.MuiCardMedia-img': {
                objectFit: 'unset',
              },
            }}
          />
          <CardActions
            sx={{
              display: 'flex',
              flexFlow: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button color='secondary' size='small'>
              See all species
            </Button>
          </CardActions>
        </StyledLink>
      </Card>
    </Box>
  )
}

export default RegionCard
