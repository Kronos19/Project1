//TOD): 
// - fix form so that hitting enter doenst reload page
// form validate so that state is valid state code

$(document).ready(function () {
  
  var eventsOut = [];
  let arrayRest = [];
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  $("#userInput").on("click", function (event) {
    event.preventDefault();
    var zip = $("#zip").val().trim();
    var city = $("#city").val().trim();

    var state = $("#state").val().trim();
    ticketMasterFetch(zip, city, state);
  });

  span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

  function ticketMasterFetch(zip, city, state) {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=JK1bYROCje1BYtx3gGe1wVE6Z0kutcdA";
    if (zip) url += "&postalCode=" + zip;
    if (city) url += "&city=" + city;
    if (state) url += "&state=" + state;
    var req = new XMLHttpRequest();
    req.onload = () => {
      eventsOut = [];
      var json = JSON.parse(req.responseText);
      console.log(json);
      if (!json._embedded) {
        modal.style.display = "block";
        return false;
      }
      var events = json._embedded.events;
      for (var i = 0; i < events.length; i++) {
        try {
          var name = events[i].name;
          var segment = events[i].classifications[0].segment.name;
          var genre = events[i].classifications[0].genre.name;
          var venue = events[i]._embedded.venues[0].name;
          var startDate = events[i].dates.start.localDate;
          var startTime = events[i].dates.start.localTime;
          var imageURL = events[i].images[1].url;
          var ticketURL = events[i].url;
          var coords = {
            latitude: events[i]._embedded.venues[0].location.latitude,
            longitude: events[i]._embedded.venues[0].location.longitude
          }
          var city = events[i]._embedded.venues[0].city.name;
          var state = events[i]._embedded.venues[0].state.stateCode;
          var eventObj = {
            name,
            segment,
            genre,
            venue,
            startDate,
            startTime,
            imageURL,
            ticketURL,
            coords,
            city,
            state
          };
          eventsOut.push(eventObj);
        } catch (er) {
          console.log("Error with event: " + i);
          console.log(er.message);
        } finally {
          console.log(i);
        }

      }
      // console.log(eventsOut);
      $("#button-view").empty();
      displayEvent(eventsOut);
      var loadingAnim = document.createElement("div");
      loadingAnim.classList.add("lds-hourglass");
      loadingAnim.id = "loading-animation";
      document.querySelector("#restaurants").appendChild(loadingAnim)
      yelp(city);
    }
    req.open("GET", url, true);
    req.send();

  }

  function yelp(arg) {

    arg = arg || console.log("no restaurant");
    let queryURL = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + arg 
      + "&radius=8046&limit=10";
    var corsURL = "https://cors-anywhere.herokuapp.com/" + queryURL;
    $.ajax({
      url: corsURL,
      method: "GET",
      headers: {
        'Authorization': "Bearer -fQflxBoof3K42D5NlSTEm1zb2Q4pYrNwqMIXOqoLAc2vw9W5KExghydPZmUeCQWOPFm5mRoQ9dYYIJHu1lz0_eTCuD0Aux8tZaVhM3XvD8x22mQaodNSGx5DVSuW3Yx"
      }
    }).then(function (response) {
      // console.log(response);
      let businessArr = response.businesses;
      arrayRest = [];
      for (let i = 0; i < businessArr.length; i++) {
        let businessObject = businessArr[i];
        let indivRest = {};
        indivRest["name"] = businessObject.name;
        indivRest["rating"] = businessObject.rating;
        indivRest["url"] = businessObject.url;
        arrayRest.push(indivRest);
      };
      console.log(arrayRest);
      var loadingAnim = document.querySelector("#loading-animation");
      document.querySelector("#restaurants").removeChild(loadingAnim)
      restaurantButton(arrayRest);
    });

  };


  function displayEvent(array) {
    console.log(array)
    var eventsDiv = $("#events-div");
    eventsDiv.empty();
    
    for (i = 0; i < array.length; i++) {

      var name = array[i].name;
      var startDate = array[i].startDate;
      var startTime = array[i].startTime ? array[i].startTime: "";
      var venue = array[i].venue;
      var genre = array[i].genre;
      var pic = array[i].imageURL;
      
      // main container
      var eventDiv = $("<div>");
      eventDiv.addClass("row");
      // eventDiv.addClass("event");

      // build left partition
      var leftPart = $("<div>");
      leftPart.addClass("col-md-8");
      // title display
      var titleDisplay = $("<h3>").text(name);
      // venue
      var venueDisplay = $("<p>").text(venue);
      //start date and time
      var dateDisplay = $("<p>").text(startDate + " " + startTime);
      //genre
      var genreDisplay = $("<p>").text("Genre: " + genre);
      //add contents to left part
      leftPart.append(titleDisplay, venueDisplay, dateDisplay, genreDisplay);

      // build right partition
      var rightPart = $("<div>");
      rightPart.addClass("col-md-4");
      //image
      var img = $("<img>");
      img.attr("src", pic);
      img.addClass("img-fluid");
      // get tickets
      var eventbutton = $("<a>");
      var string = ("<i class='fas fa-ticket-alt'></i>" 
        + "&nbsp;&nbsp;" + "Get Tickets");
      eventbutton.html(string);
      eventbutton.attr("href", array[i].ticketURL);
      eventbutton.attr("target", "_blank");
      eventbutton.attr("id", "eventbutton");
      eventbutton.addClass("btn btn-md btn-danger btn-block");
      //add contnets to right part
      rightPart.append(img, eventbutton);

      //add right and left to event div
      eventDiv.append(leftPart, rightPart);
      // add to page
      eventsDiv.append(eventDiv);

    }

  };

  function restaurantButton(arrayRest) {
    $("#button-view").empty();
    for (var i = 0; i < arrayRest.length; i++) {
      var newbutton = $("<a>");
      newbutton.addClass("btn btn-md btn-danger btn-block");
      var string = ("<i class='fas fa-utensils'></i>" + "&nbsp;&nbsp;" +  arrayRest[i].name + "<br/>Rating: " + arrayRest[i].rating);
      newbutton.html(string);
      newbutton.attr("href", arrayRest[i].url);
      newbutton.attr("target", "_blank");
      newbutton.attr("id", "button");
      $("#button-view").append(newbutton);
    }
    
  }

  function clear() {
    $("#events-div").empty();
    $("#button-view").empty();
    $("#zip").val("");
    $("#city").val("");
    $("#state").val("");
  }

  $("#clearInput").on("click", clear);
});