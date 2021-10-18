/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2021
 * @ Time: 14:47
 */

import { Category, ClassName, KingdomName, PhylumName } from '@/types'

class Specimen {
  private readonly _taxonid: number
  private readonly _kingdom_name: KingdomName
  private readonly _phylum_name: PhylumName
  private readonly _class_name: ClassName
  private readonly _order_name: string
  private readonly _family_name: string
  private readonly _scientific_name: string
  private readonly _category: Category
  private _conservation_measures?: string | null
  private _common_name?: string | null

  constructor(
    taxonid: number,
    kingdom_name: KingdomName,
    phylum_name: PhylumName,
    class_name: ClassName,
    order_name: string,
    family_name: string,
    scientific_name: string,
    category: Category,
    conservation_measures?: string | null,
    common_name?: string | null
  ) {
    this._taxonid = taxonid
    this._kingdom_name = kingdom_name
    this._phylum_name = phylum_name
    this._class_name = class_name
    this._order_name = order_name
    this._family_name = family_name
    this._scientific_name = scientific_name
    this._category = category
    this._conservation_measures = conservation_measures
    this._common_name = common_name
  }

  public get taxonid(): number {
    return this._taxonid
  }
  public get kingdom_name(): KingdomName {
    return this._kingdom_name
  }
  public get phylum_name(): PhylumName {
    return this._phylum_name
  }
  public get class_name(): ClassName {
    return this._class_name
  }
  public get order_name(): string {
    return this._order_name
  }
  public get family_name(): string {
    return this._family_name
  }
  public get scientific_name(): string {
    return this._scientific_name
  }
  public get category(): Category {
    return this._category
  }
  public get conservation_measures(): string | null | undefined {
    return this._conservation_measures
  }
  public set conservation_measures(value: string | null | undefined) {
    this._conservation_measures = value
  }
  public get common_name(): string | null | undefined {
    return this._common_name
  }
  public set common_name(value: string | null | undefined) {
    this._common_name = value
  }
}

export default Specimen
