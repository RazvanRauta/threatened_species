/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 17:44
 */

import { IRegion } from '@/types'
import {
  Box,
  Card,
  CardActions,
  Button,
  CardHeader,
  CardMedia,
  Theme,
} from '@mui/material'
import lowerCase from 'lodash/lowerCase'

import Africa from '@/assets/images/africa.svg'
import Global from '@/assets/images/global.svg'
import Europe from '@/assets/images/europe.svg'
import Asia from '@/assets/images/asia.svg'

interface Props extends IRegion {}

const RegionCard = ({ name, identifier }: Props) => {
  let imageSrc = ''

  switch (true) {
    case new RegExp(/africa/).test(lowerCase(name)): {
      imageSrc = Africa
      break
    }
    case new RegExp(/europe/).test(lowerCase(name)): {
      imageSrc = Europe
      break
    }
    case new RegExp(/asia/).test(lowerCase(name)): {
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
        <CardHeader title={name} />
        <CardMedia
          component='img'
          height='100'
          alt={name}
          image={imageSrc}
          sx={{
            '&.MuiCardMedia-img': {
              objectFit: 'unset',
            },
          }}
        />
        <CardActions>
          <Button color='secondary' size='small'>
            See species
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default RegionCard
