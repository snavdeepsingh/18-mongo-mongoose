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

// Scrape results modal OK button clicked
$(document).on("click", "#closeModal", function () {
    setTimeout(function() {
        window.location = "/";
    }, 500);
  });


  // SAVE ARTICLE button clicked
  $(document).on("click", "#savearticle", function(){
      let thisId = $(this).attr("data-id");
      $.ajax({
          method: "POST",
          url: "/savearticle/" + thisId
      })
      .then(function(){
          $("#" + thisId).slideUp();
          console.log("article saved");
      });
  });