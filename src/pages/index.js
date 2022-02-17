import React from "react"
import { Link, graphql } from "gatsby"
// import { MDXRenderer } from "gatsby-plugin-mdx"

import "./index.scss"

const Index = ({ data }) => (
  <div className="wrapper-item">
    {data.allMdx.nodes.map(node => (
      <article className="item-article" key={node.id}>
        <section className="item-head">
          <h2 className="item-title">
            <Link className="scaleup" to={`/${node.slug.toLowerCase()}`}>{node.frontmatter.title}</Link>
          </h2>
          <div className="item-subtitle">
            <span className="item-published-time">发表于 {node.frontmatter.Date}</span>
            <span className="item-dot">·</span>
            <span className="item-text-count">字数统计 {node.wordCount.words}</span>
            <span className="item-dot">·</span>
            <span className="item-type">分类 {node.frontmatter.type}</span>
          </div>
        </section>
        <section className="item-body">
          <div>{node.excerpt}</div>
        </section>
      </article>
    ))}
  </div>
)

export const query = graphql`
query {
  allMdx(sort: {fields: frontmatter___LastEditTime, order: DESC}) {
    nodes {
      id
      slug
      frontmatter {
        Date(formatString: "YYYY-MM-DD")
        LastEditTime(formatString: "YYYY-MM-DD")
        title
        type
      }
      wordCount {
        words
      }
      excerpt(pruneLength: 100)
    }
  }
}

`

export default Index
