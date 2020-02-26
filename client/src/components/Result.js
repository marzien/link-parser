import React, { Component } from "react"
import "./Result.css"

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
      version,
      title,
      headingNumber,
      headingLevel,
      pictureNumber,
      largestPicture,
      linksIntCount,
      linksExtCount,
      inaccesibleLink,
      loadingTime,
      httpStatus
    } = this.state.result

    return (
      <div>
        <h2>Results</h2>
        <ul>
          <li key={"version"}>{version}</li>
          <li key={"title"}>{title}</li>
          <li key={"heading number"}>{headingNumber}</li>
          <li key={"headingLevel"}>{headingLevel}</li>
          <li key={"picture number"}>{pictureNumber}</li>
          <li key={"largest picture"}>{largestPicture}</li>
          <li key={"internal links"}>{linksIntCount}</li>
          <li key={"external links"}>{linksExtCount}</li>
          <li key={"inaccesible link"}>{inaccesibleLink}</li>
          <li key={"loading time"}>{loadingTime}</li>
          <li key={"http status"}>{httpStatus}</li>
        </ul>
      </div>
    )
  }
}

export default Result
