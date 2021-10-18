/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 13 2021
 * @ Time: 19:27
 */

export interface IRoute {
  path: string
  component: (
    props: JSX.IntrinsicAttributes & {
      children?: React.ReactNode
    }
  ) => JSX.Element
}

export type Routes = IRoute[]

export interface IRegion {
  name: string
  identifier: string
}

export interface IGetRegionsListResponse {
  count: number
  results: IRegion[]
  error?: string
}

export interface ISpeciesByRegionParams {
  region: string
  pageNumber?: number
}

export interface IConservationMeasuresParams {
  region: string
  taxonid: number
}

export interface IGetSpeciesByRegionResponse {
  count: number
  region_identifier: string
  page: string
  error?: string
  result: ISpecimen[]
}

export interface ISpecimen {
  taxonid: number
  kingdom_name: KingdomName
  phylum_name: PhylumName
  class_name: ClassName
  order_name: string
  family_name: string
  genus_name: string
  scientific_name: string
  taxonomic_authority: null | string
  infra_rank: InfraRank | null
  infra_name: null | string
  population: null
  category: Category
  main_common_name: null | string
  conservation_measures?: null | string
  common_name?: null | string
  common_name_status?: ThunkActionStatus
  conservation_measures_status?: ThunkActionStatus
}

export enum Category {
  CR = 'CR',
  DD = 'DD',
  En = 'EN',
  Ew = 'EW',
  Ex = 'EX',
  Lc = 'LC',
  NT = 'NT',
  Na = 'NA',
  Re = 'RE',
  Vu = 'VU',
}

export enum ClassName {
  Actinopterygii = 'ACTINOPTERYGII',
  Amphibia = 'AMPHIBIA',
  Anthocerotopsida = 'ANTHOCEROTOPSIDA',
  Bivalvia = 'BIVALVIA',
  Bryopsida = 'BRYOPSIDA',
  Cephalaspidomorphi = 'CEPHALASPIDOMORPHI',
  Chondrichthyes = 'CHONDRICHTHYES',
  Gastropoda = 'GASTROPODA',
  Gnetopsida = 'GNETOPSIDA',
  Insecta = 'INSECTA',
  Jungermanniopsida = 'JUNGERMANNIOPSIDA',
  Liliopsida = 'LILIOPSIDA',
  Lycopodiopsida = 'LYCOPODIOPSIDA',
  Magnoliopsida = 'MAGNOLIOPSIDA',
  Mammalia = 'MAMMALIA',
  Marchantiopsida = 'MARCHANTIOPSIDA',
  Myxini = 'MYXINI',
  Pinopsida = 'PINOPSIDA',
  Polypodiopsida = 'POLYPODIOPSIDA',
  Polytrichopsida = 'POLYTRICHOPSIDA',
  Reptilia = 'REPTILIA',
  Sphagnopsida = 'SPHAGNOPSIDA',
}

export enum InfraRank {
  SSP = 'ssp.',
  Subsp = 'subsp.',
  Var = 'var.',
}

export enum KingdomName {
  Animalia = 'ANIMALIA',
  Plantae = 'PLANTAE',
}

export enum PhylumName {
  Anthocerotophyta = 'ANTHOCEROTOPHYTA',
  Arthropoda = 'ARTHROPODA',
  Bryophyta = 'BRYOPHYTA',
  Chordata = 'CHORDATA',
  Marchantiophyta = 'MARCHANTIOPHYTA',
  Mollusca = 'MOLLUSCA',
  Tracheophyta = 'TRACHEOPHYTA',
}

export interface IConservationMeasure {
  code: string
  title: string
}

export interface IGetConservationMeasuresResponse {
  name: string
  region_identifier: string
  result: IConservationMeasure[]
  error?: string
}
export interface IWindowSize {
  width: number | undefined
  height: number | undefined
}

export interface IGetCommonNamesResponse {
  name: string
  result: CommonSpecimenName[]
  error?: string
}

export interface CommonSpecimenName {
  taxonname: string
  primary: boolean
  language: string
}

export type ThunkActionStatus = 'idle' | 'loading' | 'failed' | 'fulfilled'
