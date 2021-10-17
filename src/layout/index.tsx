/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
