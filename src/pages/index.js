// Step 1: Import React
import React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://placekitten.com/800/600"/>

      <StaticImage alt="" src="../assets/images/test.png" />
    </Layout>
  )
}

// Step 3: Export your component
export default IndexPage