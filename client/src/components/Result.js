import React, { Component } from "react"
import "./Result.css"
import moment from "moment"
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

  componentWillReceiveProps(nextProps) {
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

    return (
      <div>
        <h2>Results</h2>
        <ul>
          <li key={"urlResponse"}>URL responsecode: {urlResponse}</li>
          <li key={"title"}>Title: {title}</li>
          <li key={"htmlVersion"}>HTML version: {htmlVersion}</li>
          <li key={"headings"}>
            Headings: <div>H1-{h1}</div> <div>H2-{h2}</div> <div>H3-{h3}</div>{" "}
            <div>H4-{h4}</div> <div>H5-{h5}</div> <div>H6-{h6}</div>
          </li>
          <li>
            {images &&
              images.map((res, i) => (
                <div key={i}>
                  {res.img}: {res.imgSizePixel}
                </div>
              ))}
          </li>
          <li>
            {links &&
              links.map((res, i) => (
                <div key={i}>
                  {res.item}: {res.status}
                </div>
              ))}
          </li>
          <li key={"executionTime"}>Execution time:{executionTime}</li>
        </ul>
      </div>
    )
  }
}

export default Result
