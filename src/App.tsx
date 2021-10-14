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
import { Provider } from 'react-redux'

import Layout from './layout'
import { routes } from './routes'
import store from './store'

const routeComponents = [
  ...routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  )),
  <Redirect to='/' key={'redirect'} />,
]

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>{routeComponents}</Switch>
          </Layout>
        </Router>
      </Provider>
    </>
  )
}

export default App
