/**
 *  @author: Razvan Rauta
 *  Date: Oct 13 2021
 *  Time: 17:33
 */

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Layout from './layout'
import { routes } from './routes'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { fetchRegionsAsync } from './store/red-list/regions/actions'

const routeComponents = [
  ...routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  )),
  <Redirect to='/' key={'redirect'} />,
]

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(fetchRegionsAsync())
    return () => {
      promise.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Router>
        <Layout>
          <Switch>{routeComponents}</Switch>
        </Layout>
      </Router>
    </>
  )
}

export default App
