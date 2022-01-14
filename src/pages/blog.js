import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const BlogPage = ({ data }) => (
  <Layout pageTitle="My Blog Posts">
    <ul>
      {
        data.allFile.nodes.map(node => (
          <li key={node.name}>
            {node.name}
          </li>
        ))
      }
    </ul>
  </Layout>
)

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
      nodes {
        name
      }
    }
  }
`

export default BlogPage
