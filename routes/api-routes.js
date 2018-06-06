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
        res.send("Ready to scrape some articles??");

    });


}