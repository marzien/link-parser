const express = require("express")
const router = express.Router()
const request = require("request")

const getHtmlVersion = require("../services/html-version")
const getTitle = require("../services/title")
const getHeadings = require("../services/headings")
const getPictures = require("../services/pictures")
const getLinks = require("../services/links")

const result = {
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
  if (validURL(url)) {
    console.log("Analyzing valid URL: " + url)

    Promise.all([getTitle(url), getHeadings(url), getPictures(url), getLinks(url)])
      .then((res) => console.log(res))
      .catch((err) => console.log("ERROR: ", err))

    const result = {
      // Bulky data updating data after POSt request
      version: "HTML5",
      title: "hello world",
      headingNumber: 10,
      headingLevel: "H1",
      pictureNumber: 5,
      largestPicture: "picture.jpg",
      linksIntCount: 3,
      linksExtCount: 1,
      inaccesibleLink: 1,
      loadingTime: 120,
      httpStatus: "200"
    }
    res.json(result)
  } else {
    console.log("Not valid URL link")
  }
})

validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // fragment locator
  return !!pattern.test(str)
}

module.exports = router
