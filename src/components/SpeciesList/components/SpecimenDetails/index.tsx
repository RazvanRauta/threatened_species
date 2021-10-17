/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 19:17
 */

import DesktopComponent from './DesktopComponent'
import type { ISpecimen } from '@/types'
import MobilesComponent from './MobilesComponent'

export interface SpecimenDetailsProps {
  loadingMeasurers: boolean
  specimen: ISpecimen
  isEndangered: boolean
  conservationMeasurers?: string
  isMobile: boolean
}

const SpecimenDetails = (props: SpecimenDetailsProps) => {
  return props.isMobile ? (
    <MobilesComponent {...props} />
  ) : (
    <DesktopComponent {...props} />
  )
}

export default SpecimenDetails
