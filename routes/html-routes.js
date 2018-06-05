var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

module.exports = function (app) {
    // Main route (simple Hello World Message)
    app.get("/", function (req, res) {
        res.send("Home");
    });


    app.get("/savedArticles", function (req, res) {
        res.send("Saved Articles");
    });



}