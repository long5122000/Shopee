import React from 'react'
import { useContext } from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import { AppContext } from 'src/contexts/app.context'
interface Props {
  children?: React.ReactNode
}
const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
