$(document).ready( function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
      })
    })

$(document).on("click", "#scrape", function() {
    $.ajax({
      method: "GET",
      url: "/scrape"
    })
    .then($.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $(".article-container").append("<div class = 'card pl-5 py-3' data-id='" + data[i]._id + "'><img src='"+data[i].image+"' class = 'float-none' style='width:192px;height:123px;'><h3><a class='article-link' href='" + data[i].link + "'" + data[i].title + "'</h3><br />" + data[i].title + "</a><br /><p><h5>"+data[i].summary+"<h5></p><p><h4 style='color:MediumSeaGreen;'>Last Update: "+data[i].lastUpdate+"<h4></p><a class='btn btn-primary save float-none' id='" + data[i]._id + "'>Save Article</a></div>");
    }
  }));
  });
  
  $(document).on("click", "a.save", function() {
    var thisId = $(this).attr("id");
    $.ajax({
      method: "PUT",
      url: "/articles/" + thisId
    })
    .then($(this).hide()
    .then($(this).parent().append("<a class='btn btn-success float-none'>Article Saved!</a></div>")))
    })

  
  $(document).on("click", "#clear", function() {
    // Grab the articles as a json
    $.ajax({
      method: "DELETE",
      url: "/articles"
    
    }).then($(document).ready( function() {
        $.ajax({
            method: "GET",
            url: "/scrape"
          })
        })).then($(".article-container").empty())
    })
  
    //////////////////////////////////////////////////////////////
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
