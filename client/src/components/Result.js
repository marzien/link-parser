import React, { Component } from "react"
import "./Result.css"
import moment from "moment"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table } from "react-bootstrap"
// import { imageSize } from "image-size"

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: {}
    }
  }

  componentDidMount() {
    fetch("/api/parser")
      .then((res) => res.json())
      .then((results) => this.setState({ result: results }))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.result !== nextProps.result) {
      this.setState({
        result: nextProps.result
      })
    }
  }

  render() {
    const {
      urlResponse,
      title,
      htmlVersion,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      images,
      links,
      scriptStart,
      scriptEnd
    } = this.state.result

    let executionTime = moment(scriptEnd).toDate() - moment(scriptStart).toDate()

    Object.size = function(obj) {
      var size = 0,
        key
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++
      }
      return size
    }

    var linksCount = Object.size(links)
    var imagesCount = Object.size(images)

    let content

    if (urlResponse === 200) {
      content = (
        <div>
          <h2>Results</h2>
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>URL response code</td>
                  <td>{urlResponse}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{title}</td>
                </tr>
                <tr>
                  <td>HTML version</td>
                  <td>{htmlVersion}</td>
                </tr>
                <tr>
                  <td>H1</td>
                  <td>{h1}</td>
                </tr>
                <tr>
                  <td>H2</td>
                  <td>{h2}</td>
                </tr>
                <tr>
                  <td>H3</td>
                  <td>{h3}</td>
                </tr>
                <tr>
                  <td>H4</td>
                  <td>{h4}</td>
                </tr>
                <tr>
                  <td>H5</td>
                  <td>{h5}</td>
                </tr>
                <tr>
                  <td>H6</td>
                  <td>{h6}</td>
                </tr>
                <tr>
                  <td>Links count</td>
                  <td>{linksCount}</td>
                </tr>
                <tr>
                  <td>Images count</td>
                  <td>{imagesCount}</td>
                </tr>
                <tr>
                  <td>Execution time</td>
                  <td>{executionTime} ms</td>
                </tr>
              </tbody>
            </Table>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Link</th>
                  <th>Response code</th>
                </tr>
              </thead>
              <tbody>
                {links &&
                  links.map((res, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <th>{res.url}</th>
                      <th>{res.status}</th>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Picture</th>
                  <th>Size KB</th>
                </tr>
              </thead>
              <tbody>
                {images &&
                  images.map((res, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <th>{res.img}</th>
                      <th>{res.size / 1000}</th>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      )
    } else if (urlResponse === "") {
      content = <div>Please parse new URL</div>
    } else {
      content = <div>This link can't be parsed</div>
    }

    return <div>{content}</div>
  }
}

export default Result
