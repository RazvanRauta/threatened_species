/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 19:20
 */

import {
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

import type { SpecimenDetailsProps } from './index'
import { styled } from '@mui/material/styles'

const StyledContent = styled(CardContent)`
  padding-top: 5px;
  & .MuiListItem-root.MuiListItem-dense {
    padding: 4px;
    margin: 0;
    & .MuiListItemText-root {
      margin: 5px 0 0;
    }
  }
`

interface Props extends SpecimenDetailsProps {}

const MobilesComponent = ({
  isEndangered,
  loadingMeasurers,
  specimen,
}: Props) => {
  return (
    <StyledContent>
      <List dense>
        <ListItem>
          <ListItemText primary={specimen.kingdom_name} secondary='Kingdom' />
        </ListItem>
        <ListItem>
          <ListItemText primary={specimen.phylum_name} secondary='Phylum' />
        </ListItem>
        <ListItem>
          <ListItemText primary={specimen.class_name} secondary='Class' />
        </ListItem>
        <ListItem>
          <ListItemText primary={specimen.order_name} secondary='Order' />
        </ListItem>
        <ListItem>
          <ListItemText primary={specimen.family_name} secondary='Family' />
        </ListItem>
        <ListItem>
          <ListItemText primary={specimen.category} secondary='Category' />
        </ListItem>
        {isEndangered && (
          <ListItem>
            {loadingMeasurers ? (
              <CircularProgress color='secondary' />
            ) : (
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {specimen.conservation_measures}
                  </Typography>
                }
                secondary='Conservation Measures'
              />
            )}
          </ListItem>
        )}
      </List>
    </StyledContent>
  )
}

export default MobilesComponent
