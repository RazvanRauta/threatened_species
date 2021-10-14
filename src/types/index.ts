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
