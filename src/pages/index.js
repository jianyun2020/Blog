import React from "react"
import { Link, graphql } from "gatsby"

import "./index.scss"

const Index = ({ data }) => (
  <div className="wrapper-item">
    {data.allMdx.nodes.map(node => (
      <article className="item-article" key={node.id}>
        <section className="item-head">
          <h2 className="item-title">
            <Link className="scaleup" to={`/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <div className="item-subtitle">
            <span className="item-spanosted">发表于 {node.frontmatter.date}</span>
            <span>字数统计</span>
          </div>
        </section>
        <section className="item-body">adfadfasfs大法师打发发生的按时</section>
      </article>
    ))}
  </div>
)

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date
          title
        }
        id
        slug
      }
    }
  }
`

export default Index
