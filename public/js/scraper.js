// scrape new articles clicked
$(document).on("click", "#scrapeButton",function(){
    $.get("/scrape", function(data){
        if(data.count) {
            $("#numArticles").text("Added " + data.count+ " new Articles!");
        }else {
            $("#numArticles").text("No new Articles found");
        }
        $("#scrapeModal").modal("toggle");
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


  // DELETE SAVED ARTICLE button clicked
  $(document).on("click", "#deletearticle", function(){
      let thisId = $(this).attr("data-id");
      $.ajax({
          method: "POST",
          url: "/deletearticle/" + thisId
      })
      .then(function(){
          $("#" + thisId).slideUp("normal", function() {
            $(this).remove();
            if ($("#search-results").children().length == 0) {
              $("#noarticles").show();
            }
          });
      })
      window.location.reload(true);
  })

    // Notes button clicked
    $(document).on("click", "#viewnotes", function(){
        let articleId = $(this).attr("data-id");
        getNotes(articleId);
        $("#notesModal").modal();
    })


    // Save Note modal button clicked
    $(document).on("click", "#savenote", function(){
        let articleId = $(this).attr("data-id");
        let newnote = $("#bodyinput").val();
        $.ajax({
            method: "POST",
            url: "/articles/" + articleId,
            data: { body: newnote }
        })
        .then(function(data){
            console.log(data);
            console.log("on click",articleId);
            getNotes(articleId);
        })
        $("bodyinput").val("");
    } )


    // delete note button clicked
    $(document).on("click", "#deletenote", function(){
        let noteId = $(this).attr("data-id");
        let articleId = $(this).attr("data-article-id");
        $.ajax({
            method: "POST",
            url: "/deletenote/" + noteId
        })
        .then(function(){
            getNotes(articleId);
        })
    })


    function getNotes(articleId){
        $.ajax({
            method: "GET",
            url: "/articles/" + articleId
        })
        .then(function(data){
            $("#notesModal").modal("toggle");
            $("#notesModalLabel").text("Notes for Article: " + data._id);
            $("#savenote").attr("data-id", data._id);
            $("#displaynotes").empty();
                console.log(data);
                let Notes = data.notes;
                console.log(Notes);
            if(Notes.length){
                // loop through all of the notes and append them to the #displaynotes div
                for(let i = 0; i < data.notes.length; i++) {
                    // build two divs (card and cardbody)
                    let card = $("<div>").addClass("card bg-light mb-2");
                    let cardBody = $("<div>").addClass("card-body").text(data.notes[i].body);

                    // build the delete button
                    let delButton = $("<button>").addClass("btn btn-danger btn-sm py-0 float-right");
                    delButton.attr("id", "deletenote");
                    delButton.attr("data-id", data.notes[i]._id);
                    delButton.attr("data-article-id", data._id);
                    delButton.text("X");

                    // put it all together and append to the DOM
                    cardBody.append(delButton);
                    card.append(cardBody);
                    $("#displaynotes").append(card);
                }
            } else {
                $("#displaynotes").text("No notes for this article yet");
            }
            $('#viewnotes[data-id="' + data._id + '" ]').text("NOTES (" +data.notes.length + ")");
        })
    }


    // clear DATABASE button clicked

    $(document).on("click", "#cleardb", function(){
        $.ajax({
            method: "GET",
            url: "/cleardb"
        })
        .then(function(){
            window.location = "/";
        })
    })