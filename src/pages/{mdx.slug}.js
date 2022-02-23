import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
// import { getImage } from "gatsby-plugin-image"

import "./child.scss"

const BlogPost = ({ data }) => {
  // const image = getImage(data.mdx.frontmatter.image)

  function changeState(e) {
    const commonClassDOM = document.querySelectorAll(".navigate-head");
    const commonClassDOMArray = Array.from(commonClassDOM);

    commonClassDOMArray.map(item => item.className = "navigate-head");

    e.target.className = "navigate-head active";
  }

  function addAnchor(item) {
    return item.map(item => {
      if (!item.items) {
        return (
          <a
            onClick={changeState}
            className="navigate-head"
            href={item.url}
            key={item.title}
          >
            {item.title}
          </a>
        )
      }

      return (
        <div>
          <a onClick={changeState} className="navigate-head" href={item.url} key={item.title}>
            {item.title}
          </a>
          <div className="navigate-child">{addAnchor(item.items)}</div>
        </div>
      )
    })
  }

  return (
    <div className="wrapper-child">
      <p>{data.mdx.frontmatter.Date}</p>
      {/* <GatsbyImage image={image} /> */}
      <div className="side-head">
        {addAnchor(data.mdx.tableOfContents.items)}
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
      tableOfContents(maxDepth: 4)
      body
    }
  }
`

export default BlogPost
