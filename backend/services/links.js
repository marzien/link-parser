const axios = require("axios")
const cheerio = require("cheerio")
const fetch = require("node-fetch")

module.exports = async function getLinks(siteUrl) {
  const html = await axios.get(siteUrl)
  const $ = cheerio.load(html.data)

  internalLinks = []
  externalLinks = []

  $("a").each((i, el) => {
    const item = $(el).attr("href") // all links
    // console.log(item)

    if (item.substring(0, 1) === "#" || item === "index.html") {
      let status
      let fullLink = siteUrl + "/" + item
      fetch(fullLink).then((res) => {
        // console.log(res.status)
        status = res.status
        // return res.json()
        console.log({ fullLink, status })
        externalLinks.push({ internalLink: fullLink, status })
      })
    } else if (item.substring(0, 4) === "http" || item.substring(0, 4) === "wwww") {
      let status
      fetch(item).then((res) => {
        // console.log(res.status)
        status = res.status
        // return res.json()
        console.log({ item, status })
        externalLinks.push({ externalLink: item, status })
      })
      // console.log(status)
    } else if (item.substring(0, 6) === "mailto") {
      console.log("email link")
    }
  })
  let links = [externalLinks, externalLinks]
  console.log(externalLinks)
  return links
}
