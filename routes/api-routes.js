var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");



module.exports = function (app) {

       // Main route (simple Hello World Message)
       app.get("/", function (req, res) {
           db.Article.find({
               saved: false
           })
           .then(function(dbArticle){
            let handleBarsObj = {
                articles: dbArticle
            };
            res.render("index", handleBarsObj);
           })
           .catch(function(err){
               res.json(err);
           })
           
        
        // res.send("Home");
    });

        // A GET route for scraping the echojs website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("article.story").has("h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("h2")
          .children("a")
          .text();
        result.link = $(this)
          .children("h2")  
          .children("a")
          .attr("href");
        result.summary = $(this)
        .children("p.summary")
        .text();
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });
  
      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });


    // GET to load all saved articles
    app.get("/savedArticles", function (req, res) {
        db.Article.find({
            saved: true
        })
        .then(function(dbArticle){
            let handleBarsObj = {
                articles: dbArticle
            };
            res.render("savedArticle", handleBarsObj);
        })
        .catch(function(err){
            res.json(err);
        })
       
        // res.send("Saved Articles");
    });
    
    // POST to save an article
    app.post("/savearticle/:id", function (req, res) {
        // res.send("all Articles");
        db.Article.findByIdAndUpdate({
            _id: req.params.id
        },{
            saved: true
        })
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        })
    });



}