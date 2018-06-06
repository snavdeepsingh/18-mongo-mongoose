// scrape new articles clicked
$(document).on("click", "#scrapeButton",function(){
    $.get("/scrape", function(data){
        if(data.count) {
            $("#numArtcicles").text("Added "+ data.count + " new Articles!");
        }else {
            $("#numArticles").text("No new Articles found");
        }
        $("#scrapeModal").modal();
    })
});