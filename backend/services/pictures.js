const cheerio = require("cheerio")
const requestImageSize = require("request-image-size")

module.exports = async function getPictures(url) {
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  $("img").each(async (i, el) => {
    const image = $(el).attr("src")

    let imageUrl = url + "/" + image
    let imageSizePixel = await requestImageSize(imageUrl)
      .then((size) => size)
      .catch((err) => console.error(err))
    console.log("imageSizePixel", imageSizePixel, url + "/" + image)
    return { imageUrl, imageSize: imageSizePixel.downloaded }
  })
}
