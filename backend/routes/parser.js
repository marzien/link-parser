const express = require("express")
const router = express.Router()
const request = require("request")

const checkUrl = require("../services/url-validator")
const getHtmlVersion = require("../services/html-version")
const getTitle = require("../services/title")
const getHeadings = require("../services/headings")
const getPictures = require("../services/pictures")
const getLinks = require("../services/links")

let result = {
  version: "",
  title: "",
  headingNumber: 0,
  headingLevel: "",
  pictureNumber: 0,
  largestPicture: "",
  linksIntCount: 0,
  linksExtCount: 0,
  inaccesibleLink: 0,
  loadingTime: 0,
  httpStatus: "200"
}
router.get("/", (req, res) => {
  res.json(result)
})

router.post("/", (req, res) => {
  let { url } = req.body

  // validating URL with regex and if valid get reponse code
  checkUrl(url)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  // TODO: inside promise start timer
  // solutions for URL
  Promise.all([
    getHtmlVersion(url),
    getTitle(url),
    getHeadings(url),
    getPictures(url),
    getLinks(url)
  ])
    .then((parserResult) => {})
    .catch((err) => console.log("ERROR: ", err))

  // TODO: inside promise end timer

  // TODO: send data to react front res.json(result)

  // Bulky data updating data after POSt request
  // const result = {
  //   version: "HTML5",
  //   title: "hello world",
  //   headingNumber: 10,
  //   headingLevel: "H1",
  //   pictureNumber: 5,
  //   largestPicture: "picture.jpg",
  //   linksIntCount: 3,
  //   linksExtCount: 1,
  //   inaccesibleLink: 1,
  //   loadingTime: 120,
  //   httpStatus: "200"
  // }
  console.log(result)
  res.json(result)
})

module.exports = router
