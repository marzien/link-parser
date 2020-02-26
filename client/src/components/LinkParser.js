import React, { Component } from "react"
import Result from "./Result"
import UrlForm from "./UrlForm"

class LinkParser extends Component {
  constructor(props) {
    super(props)
    this.state = { result: {} }
  }
  handleData = (data) => {
    this.setState({ result: data })
  }
  render() {
    return (
      <div>
        <UrlForm getData={this.handleData} />
        <Result result={this.state.result} />
      </div>
    )
  }
}

export default LinkParser
