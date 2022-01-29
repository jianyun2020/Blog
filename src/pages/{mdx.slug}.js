import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const BlogPost = ({ data }) => {
  const image = getImage(data.mdx.frontmatter.image)

  return (
    <div >
      <p>{data.mdx.frontmatter.Date}</p>
      <GatsbyImage image={image} />
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </div>
  )
}

export const query = graphql`
query ($id: String) {
  mdx(id: {eq: $id}) {
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
    body
  }
}

`

export default BlogPost
