/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2021
 * @ Time: 15:10
 */

class Region {
  private readonly _name: string
  private readonly _identifier: string

  constructor(name: string, identifier: string) {
    this._name = name
    this._identifier = identifier
  }

  public get name(): string {
    return this._name
  }
  public get identifier(): string {
    return this._identifier
  }
}

export default Region
