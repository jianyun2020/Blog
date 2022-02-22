import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import "./child.scss"

const BlogPost = ({ data }) => {
  const image = getImage(data.mdx.frontmatter.image)

  return (
    <div className="wrapper-child">
      <p>{data.mdx.frontmatter.Date}</p>
      {/* <GatsbyImage image={image} /> */}
      <div className="side-head">
        {
          data.mdx.tableOfContents.items.map(item => (
            <a className="navigate-head" href={item.url}>{item.title}</a>
          ))
        }
      </div>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </div>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        Date(formatString: "MMMM D, YYYY")
        LastEditTime
        type
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
      body
    }
  }
`

export default BlogPost
