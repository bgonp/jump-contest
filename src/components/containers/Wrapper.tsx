import { FC } from 'react'

import Footer from 'components/containers/Footer'
import Header from 'components/containers/Header'

const Wrapper: FC = ({ children }) => (
  <div className="wrapper">
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
)

export default Wrapper
