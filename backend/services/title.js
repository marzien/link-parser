const axios = require('axios');
const cheerio = require('cheerio');

// export async function getTitle(url) {
module.exports = async function getTitle(url) {
    const html = await axios.get(url);
    const $ = await cheerio.load(html.data);

    return $("title").text();
  }