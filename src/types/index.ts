export interface IRoute {
  path: string
  component: (
    props: JSX.IntrinsicAttributes & {
      children?: React.ReactNode
    }
  ) => JSX.Element
}

export type Routes = IRoute[]

