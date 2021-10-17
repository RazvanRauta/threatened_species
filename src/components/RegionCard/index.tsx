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
import type { IRegion } from '@/types'
import { Link } from 'react-router-dom'
import lowerCase from 'lodash/lowerCase'

const StyledLink = styled(Link)`
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: inherit;
`

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
        <StyledLink to={`/species/${identifier}`}>
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
