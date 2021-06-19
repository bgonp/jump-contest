import { FC } from 'react'

import Footer from 'components/containers/Footer'
import Header from 'components/containers/Header'

const Wrapper: FC = ({ children }) => (
  <div className="main">
    <Header />
    <div className="content">
      {children}
    </div>
    <Footer />
  </div>
)

export default Wrapper
