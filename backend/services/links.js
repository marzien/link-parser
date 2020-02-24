const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

// set some defaults
req = request.defaults({
	jar: true,                 // save cookies to jar
	rejectUnauthorized: false, 
	followAllRedirects: true   // allow redirections
});

// export async function getTitle(url) {
module.exports = async function getLinks(siteUrl) {
    const html = await axios.get(siteUrl);
    const $ = await cheerio.load(html.data);

    internalLinks = 0;
    externalLinks = 0;
    brokenLinks = 0;
    // All links  TODO: index.html, mailto
    $('a').each((i, el) => {
      const item = $(el).attr('href'); // all links
      // console.log(item);
      if (item.substring(0,4) === 'http' || item.substring(0,4) === 'wwww')  {
        externalLinks += 1;

        if(isURLBroken(item)) { // cheking only externa links
          brokenLinks += 1;
        };

      } else {
        internalLinks += 1;
      }
    })
    return [{'internalLinks': internalLinks}, 
    {'externalLinks': externalLinks}, 
    {'externalBrokenLinks':brokenLinks}];
}

isURLBroken = (fullyQualifiedURL) => {
    const w3validator = 'https://validator.w3.org/nu/?doc=';
    let isBroken = false;
    // console.log(w3validator+fullyQualifiedURL);
    req.get({
      url: w3validator+fullyQualifiedURL,
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
       }
    }, (err, resp, body) => {
      
      // load the html into cheerio
      let $ = cheerio.load(body);
    
    // let result = $('#results p strong').text()
    let result = $('.non-document-error p strong').text()
    // console.log(result);
    if(result == 'IO Error') {
      isBroken = true
      console.log("Site link not working");
      return isBroken;
    } else {
      console.log("Site link working");
      isBroken = false;
      return isBroken;
    }	
    console.log('isBroken '+isBroken);
    return isBroken;
    })}