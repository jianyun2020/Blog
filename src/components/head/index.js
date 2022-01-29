import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import './index.scss'

const Head = () => {
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
    <div className="wrapper-head">
      <h2 className="item-title">{data.site.siteMetadata.title}</h2>
      <nav className="list-item">
        <Link className="item-link" to="/"><span className="item-icon"></span>首页</Link>
        <Link className="item-link" to="/archive">归档</Link>
        <Link className="item-link" to="/about">关于我</Link>
      </nav>
    </div>
  )
}

export default Head
