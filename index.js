const PORT = 3001;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://en.m.wikipedia.org/wiki/Mites_of_livestock";

axios(url)
  .then((response) => {
    const html = response.data;
    // console.log(html);
    //For peaking exact elements like buttons and so
    const $ = cheerio.load(html);
    // // create array for what we get from another pages to place in
    const articles = [];

    $(".mw-editsection, html ").each(function () {
      const title = $(this).text();
      // $(this).attr("href")
      const url = $(this).find("a").attr("href");
      const para = $(this).find("p");
      // push inside the array
      articles.push({
        title,
        url,
        para,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
