import React, { Component } from "react"
import "./Result.css"

class Result extends Component {
  constructor() {
    super()
    this.state = {
      results: {}
    }
  }

  componentDidMount() {
    fetch("/api/parser")
      .then((res) => res.json())
      .then((results) =>
        this.setState({ results }, () => console.log("Starter data.."))
      )
  }

  // updating state from server
  componentWillMount() {
    fetch("/api/parser")
      .then((res) => res.json())
      .then((results) =>
        this.setState({ results }, () => console.log("After sending URL.."))
      )
      .catch((error) => {
        console.error(error)
      })
  }

  componentDidUpdate(nextProps, prevState) {
    console.log("componentDidUpdate")
    console.log(this.state.results)
  }

  // https://stackoverflow.com/questions/56453521/what-react-lifecycle-component-to-use-to-update-state-after-an-axios-post

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
    } = this.state.results

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
