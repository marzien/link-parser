const axios = require("axios")
const cheerio = require("cheerio")
const url = require("url")
const https = require("https")
const http = require("http")
const sizeOf = require("image-size")

// export async function getTitle(url) {
module.exports = async function getPictures(url) {
  const html = await axios.get(url)
  const $ = await cheerio.load(html.data)

  imgCount = 0
  imgBigest = 0
  bigestImgName = ""
  data = []
  // All images
  $("img").each((i, el) => {
    imgCount += 1
    const image = $(el).attr("src")

    var imageSizePixel = imageSize(url, image)
    // console.log(imageSize(url, image))
    // data.push({ 'img': image });
    data.push({ img: image, imgSizePixel: imageSizePixel })

    // TODO: find bigest image
    // if( imageSize(image) < imgBigest ) {
    //   imgBigest = imageSize(image);
    //   bigestImgName = image;
    // }
  })
  return data
}

const imageSize = (siteUrl, imgUrl) => {
  var options = url.parse(siteUrl + "/" + imgUrl)
  var imageSize = 0 //TODO: Fix when always 0

  // if main URL is https
  if (siteUrl.substring(0, 5) === "https") {
    https.get(options, function(response) {
      var chunks = []
      response
        .on("data", function(chunk) {
          chunks.push(chunk)
        })
        .on("end", function() {
          var buffer = Buffer.concat(chunks)
          let imageDimensions = sizeOf(buffer)
          // console.log(imageDimensions.height * imageDimensions.width) // right value
        })
      return imageSize
    })
  } else {
    // if main URL is http
    http.get(options, function(response) {
      var chunks = []
      response
        .on("data", function(chunk) {
          chunks.push(chunk)
        })
        .on("end", function() {
          var buffer = Buffer.concat(chunks)
          let imageDimensions = sizeOf(buffer)
          return imageDimensions.height * imageDimensions.width
        })
    })
  }
  // console.log(imageSize) // 0
  return imageSize
}
