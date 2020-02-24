const express = require('express');
const router = express.Router();

const request = require('request');

req = request.defaults({
	jar: true,                 // save cookies to jar
	rejectUnauthorized: false, 
	followAllRedirects: true   // allow redirections
});

router.get('/', (req, res) => {
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
    };

    res.json(result);
});

router.post('/', (req, res) => {
    let URLlink = req.body.url;
    if(validURL(URLlink)) {
        console.log(('Analyzing valid URL: '+URLlink))

        const result = {
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
        };
        res.json(result)
    } else {
        console.log('Not valid URL link')
    };









})

validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

module.exports = router;