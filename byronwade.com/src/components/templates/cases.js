//Import for code parts of react and gatsby
import React, { Component } from 'react' //reacts core
import { graphql } from 'gatsby' //gatsbys graphql setup
import ReactHtmlParser from 'react-html-parser'; //parse html
import moment from "moment/moment" //date formatting
//import Img from "gatsby-image" //gatsby image API

//Link import to check if internal or external link
import Link from "../utils/links" //custom links

//Import Blocks
//import BlockList from "../blocks/BlockList"

//Import Fragment queries
//import HeadingBlockInfo from "../blocks/blockFragments/core/Header"
//import ListBlockInfo from "../blocks/blockFragments/core/List"

//Import Layout for pages
import Layout from "../body/layout"

class IndexPage extends Component {
  renderPreviousLink = () => {
    const { pageContext: { pageNumber }, } = this.props

    let previousLink = null

    if (!pageNumber) {
      return null
    } else if (1 === pageNumber) {
      previousLink = `/case-study/`
    } else if (1 < pageNumber) {
      previousLink = `/case-study/${pageNumber - 1}`
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
        <Link type="primary" to={`/case-study/${pageNumber + 1}`} >
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
   
    return (
      <Layout pageNumber={pageNumber} location={{ location }}>
        {data && data.wordpress && data.wordpress.casestudys.nodes.map(casestudy => (
            <div key={casestudy.id}>
              <pre>{JSON.stringify(casestudy.featuredImage, null, 4)}</pre>
              <h1>{ReactHtmlParser(casestudy.title)}</h1>
              <small>{moment(casestudy.date).format(`MMM Do YYYY`)}</small>
              <div>{ReactHtmlParser(casestudy.excerpt)}</div>
              <Link to={"/"+casestudy.uri}>Read More</Link>
            </div>
          ))}
          {this.pagination()}
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query GET_CASES($id: Int) {
    wordpress {
      casestudys(where: { id: $id }) {
        nodes {
          id
          slug
          date
          title
          excerpt
          uri
          featuredImage {
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