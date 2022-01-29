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
      <div className='container'>
        <Head title={data.site.siteMetadata.title}/>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout