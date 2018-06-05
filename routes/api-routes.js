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
    
    // Retrieve data from the db
    app.get("/all", function (req, res) {
        res.send("all Articles");
    });

    // Scrape data from one site and place it into the mongodb db
    app.get("/scrape", function (req, res) {
        res.send("Ready to scrape some articles??");
    });


}