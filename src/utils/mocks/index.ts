/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 19 2021
 * @ Time: 10:27
 */

import {
  Category,
  ClassName,
  IGetCommonNamesResponse,
  IGetConservationMeasuresResponse,
  IGetRegionsListResponse,
  IGetSpeciesByRegionResponse,
  KingdomName,
  PhylumName,
} from '@/types'

export const mockedRegionsResponse: IGetRegionsListResponse = {
  count: 1,
  results: [
    {
      identifier: 'europe',
      name: 'Europe',
    },
  ],
}

export const mockedRegionsSpeciesResponse: IGetSpeciesByRegionResponse = {
  count: 1,
  region_identifier: 'europe',
  page: '0',
  result: [
    {
      taxonid: 59,
      scientific_name: 'Loxodonta africana',
      kingdom_name: KingdomName.Animalia,
      phylum_name: PhylumName.Chordata,
      class_name: ClassName.Mammalia,
      order_name: 'PROBOSCIDEA',
      family_name: 'ELEPHANTIDAE',
      genus_name: 'Loxodonta',
      main_common_name: 'African Savanna Elephant',
      taxonomic_authority: null,
      infra_rank: null,
      infra_name: null,
      population: null,
      category: Category.CR,
    },
    {
      taxonid: 59,
      scientific_name: 'Loxodonta africana',
      kingdom_name: KingdomName.Animalia,
      phylum_name: PhylumName.Chordata,
      class_name: ClassName.Mammalia,
      order_name: 'PROBOSCIDEA',
      family_name: 'ELEPHANTIDAE',
      genus_name: 'Loxodonta',
      main_common_name: 'African Savanna Elephant',
      taxonomic_authority: null,
      infra_rank: null,
      infra_name: null,
      population: null,
      category: Category.CR,
    },
    {
      taxonid: 59,
      scientific_name: 'Loxodonta africana',
      kingdom_name: KingdomName.Animalia,
      phylum_name: PhylumName.Chordata,
      class_name: ClassName.Mammalia,
      order_name: 'PROBOSCIDEA',
      family_name: 'ELEPHANTIDAE',
      genus_name: 'Loxodonta',
      main_common_name: 'African Savanna Elephant',
      taxonomic_authority: null,
      infra_rank: null,
      infra_name: null,
      population: null,
      category: Category.CR,
    },
    {
      taxonid: 59,
      scientific_name: 'Loxodonta africana',
      kingdom_name: KingdomName.Animalia,
      phylum_name: PhylumName.Chordata,
      class_name: ClassName.Mammalia,
      order_name: 'PROBOSCIDEA',
      family_name: 'ELEPHANTIDAE',
      genus_name: 'Loxodonta',
      main_common_name: 'African Savanna Elephant',
      taxonomic_authority: null,
      infra_rank: null,
      infra_name: null,
      population: null,
      category: Category.CR,
    },
    {
      taxonid: 59,
      scientific_name: 'Loxodonta africana',
      kingdom_name: KingdomName.Animalia,
      phylum_name: PhylumName.Chordata,
      class_name: ClassName.Mammalia,
      order_name: 'PROBOSCIDEA',
      family_name: 'ELEPHANTIDAE',
      genus_name: 'Loxodonta',
      main_common_name: 'African Savanna Elephant',
      taxonomic_authority: null,
      infra_rank: null,
      infra_name: null,
      population: null,
      category: Category.CR,
    },
  ],
}

export const mockedCommonNameResponse: IGetCommonNamesResponse = {
  name: 'loxodonta africana',
  result: [
    { taxonname: 'African Savanna Elephant', primary: true, language: 'eng' },
  ],
}

export const mockedConservationMeasurersResponse: IGetConservationMeasuresResponse =
  {
    id: '22823',
    region_identifier: 'europe',
    result: [
      { code: '1.1', title: 'Site/area protection' },
      { code: '1.2', title: 'Resource & habitat protection' },
      { code: '2.1', title: 'Site/area management' },
    ],
  }

export const mockedApiErrorResponse = {
  error: 'Error message',
  result: [],
}
export const mockedNoMoreResultsResponse = {
  result: [],
  count: 0,
}
