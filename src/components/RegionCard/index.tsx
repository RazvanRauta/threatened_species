/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 17:44
 */

import type { IRegion } from '@/types'
import {
  Box,
  Card,
  CardActions,
  Button,
  CardHeader,
  CardMedia,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import lowerCase from 'lodash/lowerCase'
import { Link } from 'react-router-dom'

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
        <CardActions
          sx={{
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            component={Link}
            to={`/species/${identifier}`}
            color='secondary'
            size='small'
          >
            See species
          </Button>
          <Button
            component={Link}
            to={`/species/${identifier}?CR`}
            color='secondary'
            size='small'
          >
            See Endangered
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default RegionCard
