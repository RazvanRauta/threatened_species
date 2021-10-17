/**
 *  @author: Razvan Rauta
 *  Date: Oct 13 2021
 *  Time: 17:33
 */

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import Layout from './layout'
import { routes } from './routes'

const routeComponents = [
  ...routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  )),
  <Redirect to='/' key={'redirect'} />,
]

const App = () => {
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
