"use strict";

const cheerio = require('cheerio');
const request = require('request');

var getResponseObject = (body, code) => {
  return  {
    statusCode : code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body)
  };
}

module.exports.urlMetadataScrapper = async (event, context) => {
  let input = JSON.parse(event.body);
  if (input.url) {
    const requestOpts = {
      url: input.url
    };
  
    let promise = new Promise((resolve, reject) => {
      request.get(requestOpts, function (err, response, body) {
        if (err || !response) {
          return resolve("FAILED");
        }
        if (response.statusCode && response.statusCode !== 200) {
          return resolve("FAILED");
        }
        if (response.statusCode && response.statusCode === 200) {
          let url = input.url;
          if (response.request.uri.href) url = response.request.uri.href;
          return resolve({url, body});
        }
      });
    });
    try {
      let data = await promise;
      if (data === "FAILED") {
        return getResponseObject({message: "Can't retrieve data!"}, 404);
      }
      const $ = cheerio.load(data.body);
      const $metaTags = $('meta');
      var extracted = {};
      $metaTags.each(function (index, el) {
        if ($(this).attr('content')) {
          if ($(this).attr('name')) {
            extracted[$(this).attr('name')] = $(this).attr('content');
          }
          if ($(this).attr('property')) {
            extracted[$(this).attr('property')] = $(this).attr('content');
          }
          if ($(this).attr('itemprop')) {
            extracted[$(this).attr('itemprop')] = $(this).attr('content');
          }
        }
      });
      return getResponseObject(extracted, 200);
    } catch (err) {
      console.log(err);
      return getResponseObject({message: "Something went wrong!"}, 500);
    }
  } else {
    return getResponseObject({message: "Bad Request!"}, 400);
  }
};