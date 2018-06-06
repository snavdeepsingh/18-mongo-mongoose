var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");



module.exports = function (app) {

       // Main route (simple Hello World Message)
       app.get("/", function (req, res) {
        let handleBarsObj = {};
        res.render("index", handleBarsObj);
        // res.send("Home");
    });


    app.get("/savedArticles", function (req, res) {
        let handleBarsObj = {};
        res.render("savedArticle", handleBarsObj);
        // res.send("Saved Articles");
    });
    
    // Retrieve data from the db
    app.get("/all", function (req, res) {
        res.send("all Articles");
    });

    // Scrape data from one site and place it into the mongodb db
    app.get("/scrape", function (req, res) {
        // res.send("Ready to scrape some articles??");
        axios.get("http://www.nytimes.com").then(function (response){
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following
            $("article h2").each(function(i, element){
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                .children("a")
                .text();
                result.link = $(this)
                .children("a")
                .attr("href");
                result.summary = $(this)
                .children("p")
                .text()
                
                // 

                // Create a new Article using the `result` object built from scraping
               db.Article.create(result)
               .then(function(dbArticle){
                   // View the added result in the console
                   console.log(dbArticle);
               }).catch(function(err){
                   console.log(err);
                   return res.json(err);
               })
            })
            res.json("scrape complete");
        })

    });


}