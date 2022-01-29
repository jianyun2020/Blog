import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Head from '../head';

import './index.scss'

const Layout = ({ children }) => {

const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`)

  return (
    <div className='wrapper-layout'>
      <div className='wrapper-container'>
        <div className="wrapper-head-background">
          <Head title={data.site.siteMetadata.title}/>
        </div>
        <main className="wrapper-body">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout