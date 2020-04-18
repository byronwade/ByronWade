import React, { Component } from "react"
import { graphql } from "gatsby"
import Link from "../utils/links"
import Img from "gatsby-image"

import Layout from "../components/body/layout"

class WorksPage extends Component {
  renderPreviousLink = () => {
    
    const { pageContext: { pageNumber }, } = this.props

    let previousLink = null

    if (!pageNumber) {
      return null
    } else if (1 === pageNumber) {
      previousLink = `/work/`
    } else if (1 < pageNumber) {
      previousLink = `/work/${pageNumber - 1}`
    }

    return (
      <Link type="primary" to={previousLink}>
        Previous Posts
      </Link>
    )
  }

  renderNextLink = () => {
    const { pageContext: { hasNextPage, pageNumber }, } = this.props

    if (hasNextPage) {
      return (
        <Link type="primary" to={`/work/${pageNumber + 1}`} >
          Next Posts
        </Link>
      )
    } else {
      return null
    }
  }

  pagination = () => {
    const { pageContext: { hasNextPage }, } = this.props

    if (hasNextPage) {
      return (
        <div className="pagnation">
          <span className="next">{this.renderNextLink()}</span>
          <span className="previous">{this.renderPreviousLink()}</span>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const { data, location, pageContext: { pageNumber }, } = this.props
    console.log(data)
    console.log(this.props)
    return (
      <Layout pageNumber={pageNumber} location={{ location }}>
        {data && data.wordpress && data.wordpress.works.nodes.map(work => (
            <div key={work.id}>
              {/* <pre>{JSON.stringify(work.featuredImage, null, 4)}</pre> */}
              {work.featuredImage ? (<Img fluid={work.featuredImage.imageFile.childImageSharp.fluid} alt="Gatsby Docs are awesome" />) : null}
              <h1>{work.title}</h1>
              <small>{work.date}</small>
              <div dangerouslySetInnerHTML={{__html: work.excerpt}} />
              {/* <p>{work.excerpt}</p> */}
              <Link to={"/"+work.uri}>Read More</Link>
            </div>
          ))}


          {this.pagination()}


      </Layout>
    )
  }
}

export default WorksPage

export const query = graphql`
  query GET_WORKS($id: Int) {
    wordpress {
      works(where: { id: $id }) {
        nodes {
          id
          slug
          date
          title
          excerpt
          uri
          featuredImage {
            sourceUrl
            mediaItemId
            modified
            altText
            caption
            mediaItemUrl
            imageFile {
              childImageSharp {
                fluid(maxWidth: 650) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`