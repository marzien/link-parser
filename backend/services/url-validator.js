// https://httpstat.us/500
const fetch = require("node-fetch")

https: module.exports = async function checkUrl(url) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  )

  if (pattern.test(url)) {
    return (await fetch(url)).status
  } else {
    console.log("ERROR: not valid given URL")
  }
}
