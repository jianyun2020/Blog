import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from "../components/layout"

const BlogPage = ({ data }) => (
  <Layout pageTitle="My Blog Posts">
    {
      data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>{node.frontmatter.title}</h2>
          <p>Posted: {node.frontmatter.date}</p>
          <p>Last Modified: {node.parent.modifiedTime}</p>

          <MDXRenderer>
            {node.body}
          </MDXRenderer>
        </article>
      ))
    }
  </Layout>
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
        body
        parent {
          ... on File {
            modifiedTime(formatString: "YYYY/MM/DD HH:MM")
          }
        }
      }
    }
  }
`

export default BlogPage
