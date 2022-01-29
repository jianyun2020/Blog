import React from "react"

import Head from '../head';

import './index.scss'

const Layout = ({ children }) => {

  return (
    <div className='wrapper-layout'>
      <div className='container'>
        <Head />
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
