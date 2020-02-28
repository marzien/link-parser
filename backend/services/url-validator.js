const https = require("https")

// export async function getTitle(url) {
module.exports = async function checkUrl(url) {
  // 1. URL validation with regex.
  // 2. Geting link response (200, 400, 500)

  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // fragment locator

  let validUrl = new Promise((res, rej) => {
    if (pattern.test(url)) {
      res()
    } else {
      rej()
    }
  })

  validUrl
    .then(() => {
      return https
        .get(url, (res) => {
          return res.statusCode
        })
        .on("error", (err) => {
          console.error(err)
        })
    })
    .catch((err) => console.log("Not valid URL address: ", err))
  // .then((res) => console.log("Status code: ", res.statusCode)) // how return code to parser.js

  let bulkyReturn = 200 // test value, need to fix return
  return bulkyReturn
}
