$(document).ready( function() {
    $.ajax({
      method: "GET",
      url: "/saved"
    })
    .then($.getJSON("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $(".saved-article-container").append("<div class = 'card pl-5 py-3' id='" + data[i]._id + "'><img src='"+data[i].image+"' class = 'float-none' style='width:192px;height:123px;' id='" + data[i]._id + "'></img><br /><h3><a class='article-link' href='" + data[i].link + "'" + data[i].title + "'</h3><br />" + data[i].title + "</a><br><br><p>"+data[i].summary+"</p><a class='btn btn-outline-danger delete float-none mr-3 mb-3' id='" + data[i]._id + "'>Unsave Article</a><a class='btn btn-outline-warning note float-none mr-3 mb-3' id='" + data[i]._id + "'>Add Note</a></div>");
    }
  }));
  });

  // When you click the savenote button
  $(document).on("click", "a.note", function() {

    var thisId = $(this).attr("id");
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    .then($.getJSON("/articles/" + thisId, function(data) {
        var note = "";
            if (data.note) {
                note = data.note;
            } else {
                note = "None";
            }
        $("body").append("<div class='bootbox modal fade show' tabindex='-1' role='dialog' style='display: block;' id='note-modal'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true' style='margin-top: -10px;'>×</button><div class='bootbox-body'><div class='container-fluid text-center'><h4>Notes For Article: "+data._id+"</h4><hr><ul class='list-group note-container'><li class='list-group-item'>Current Notes: "+note+"</li></ul><textarea class='mt-3' placeholder='New Note' rows='4' cols='40' id='note'></textarea><button class='btn btn-success save mt-2' id='"+thisId+"'>Save Note</button></div></div></div></div></div></div>")
    }))
})
    // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");
$(document).on("click", "button.save", function() {
    var thisId = $(this).attr("id");
    var note = $("#note").val();

    if ($("#note").val() == "") {
        return alert("You didn't enter a note!")
    } else {
//     // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        // title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#note").val()
      } 
    },
    console.log("Note: " + $("#note").val()))
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#note").detach();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#note").val("");
    $("#note-modal").detach()
    .then(alert('You saved the note: ' + note))
    }
  })
  


  $(document).on("click", "a.delete", function() {

    var thisId = $(this).attr("id");
    $.ajax({
      method: "PUT",
      url: "/unsave/" + thisId
    })
    .then($(this).closest("div.card").remove());
  })

  $(document).on("click", "a#clear-saved", function() {

    $.ajax({
      method: "PUT",
      url: "/unsave"
    })
    .then($(".saved-article-container").detach())
  })


  $(document).on("click", "button.close", function() {
        $("#note-modal").detach()
  })


//   .then($.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   }))
//   .then($.getJSON("/articles/" + thisId, function(data) {
//       console.log("Get article by ID data: " + JSON.stringify(data));
//       $(this).parent().append("<div><h3>Note Saved!</h3><br /><h2>"+ data.note.title +"</h2><br /><p>"+ data.note.body +"</p></div>")
//   }))

