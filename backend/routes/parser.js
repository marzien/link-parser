const express = require("express")
const router = express.Router()
const request = require("request")

const checkUrl = require("../services/url-validator")
const getHtmlVersion = require("../services/html-version")
const getTitle = require("../services/title")
const getHeadings = require("../services/headings")
const getPictures = require("../services/pictures")
const getLinks = require("../services/links")

const result = {
  urlResponse: "-",
  title: "-",
  htmlVersion: "-",
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  images: [],
  links: [],
  scriptStart: {},
  scriptEnd: {}
}
router.get("/", (req, res) => {
  res.json(result)
})

router.post("/", (req, res) => {
  let { url } = req.body

  checkUrl(url)
    .then((res) => {
      return [{ urlResponse: res, start: new Date() }]
    })
    // .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .then(async (validationRes) => {
      let parserResult = await Promise.all([
        getHtmlVersion(url),
        getTitle(url),
        getHeadings(url),
        getPictures(url),
        getLinks(url)
      ])
        .then((parserResult) => {
          return parserResult
        })
        .catch((err) => console.log("ERROR: ", err))
      return validationRes.concat(parserResult)
    })
    // .then((res) => console.log(res))
    .then((res) => {
      // console.log(res.concat([{ end: new Date() }]))
      return res.concat({ end: new Date() })
    })
    .then((res) => console.log(res))

  // fake data to frontend
  const result = {
    urlResponse: 200,
    title: "My Super Title",
    htmlVersion: "HTML5",
    h1: 1,
    h2: 12,
    h3: 10,
    h4: 0,
    h5: 0,
    h6: 0,
    images: [
      { img: "assets/images/mongodb.jpg", imgSizePixel: 2000 },
      { img: "assets/images/angular-galery.png", imgSizePixel: 3000 }
    ],
    links: [
      { item: "https://www.codewars.com/users/marzien", status: 200 },
      { item: "http://mariusdev.tech/", status: 200 },
      { item: "https://github.com/marzien/nfq-shopping-cart", status: 200 },
      { item: "https://www.linkedin.com/in/marius-zienius/", status: 999 },
      { item: "https://github.com/marzien", status: 200 }
    ],
    scriptStart: {
      __type: "Date",
      iso: "2017-08-22T06:11:00.000Z"
    },
    scriptEnd: {
      __type: "Date",
      iso: "2017-08-22T06:11:00.000Z"
    }
  }
  res.json(result)
})

module.exports = router
