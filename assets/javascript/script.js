$(document).ready(function () {


  $("#userInput").on("click", function () {

    event.preventDefault();

    var zipcode = $("#zip").val().trim();

    console.log(zipcode);

  });

 var famArray = ["Mom", "Dad", "Brother"];


  function displayEvent(array) {

    $("#info-div").empty();

    for (i = 0; i < array.lenght; i++) {

      var eventDiv = $("<div>"); 

      eventDiv.addClass("event");
      eventDiv.text(array[i]);
      eventDiv.attr("data-name");

      $("#info-div").append(eventDiv);

    }

  };

  displayEvent(famArray);

});