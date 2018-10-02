//TOD): 
// - fix form so that hitting enter doenst reload page
// form validate so that state is valid state code

$(document).ready(function () {
  var eventsOut = [];
  let arrayRest = [];
  var errMsgDisplay = document.querySelector("#err-msg");
  $("#userInput").on("click", function (event) {
    event.preventDefault();
    var zip = $("#zip").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    ticketMasterFetch(zip, city, state);
  });

  function err(string) {
    errMsgDisplay.textContent = string;
  }

  function ticketMasterFetch(zip, city, state) {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=JK1bYROCje1BYtx3gGe1wVE6Z0kutcdA";
    if (zip) url += "&postalCode=" + zip;
    if (city) url += "&city=" + city;
    if (state) url += "&state=" + state;
    var req = new XMLHttpRequest();
    req.onload = () => {
      var json = JSON.parse(req.responseText);
      if (!json._embedded) {
        err("try a different zip");
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
      displayEvent(eventsOut);
      eventLinkButton(eventsOut);
      yelp(city);
    }
    req.open("GET", url, true);
    req.send();

  }

  function yelp(arg) {

    arg = arg || console.log("no restaurant");

    //query api
    let queryURL = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + arg + "&radius=8046&limit=10";
    //corsURL issue code fix
    var corsURL = "https://cors-anywhere.herokuapp.com/" + queryURL;

    $.ajax({
      url: corsURL,
      method: "GET",

      headers: {
        //my API
        'Authorization': "Bearer -fQflxBoof3K42D5NlSTEm1zb2Q4pYrNwqMIXOqoLAc2vw9W5KExghydPZmUeCQWOPFm5mRoQ9dYYIJHu1lz0_eTCuD0Aux8tZaVhM3XvD8x22mQaodNSGx5DVSuW3Yx"
      }
    }).then(function (response) {
      // console.log(response);
      let businessArr = response.businesses;

      arrayRest = [];

      //loop the array from yelp, take the properties needed and add to a new object, and loop them all into a new array
      for (let i = 0; i < businessArr.length; i++) {
        let businessObject = businessArr[i];
        let indivRest = {};
        indivRest["name"] = businessObject.name;
        indivRest["rating"] = businessObject.rating;
        indivRest["url"] = businessObject.url;
        arrayRest.push(indivRest);
      };
      console.log(arrayRest);
      restaurantButton(arrayRest);
    });

  };


  function displayEvent(array) {
    console.log(array)
    for (i = 0; i < array.length; i++) {

      var name = array[i].name;
      var startdate = array[i].startDate;
      var genre = array[i].genre;

      // console.log(name)

      var eventDiv = $("<div>");
      eventDiv.addClass("event");

      var p = $("<p>").text("Name: " + name);
      var g = $("<p>").text("Genre: " + genre);
      var s = $("<p>").text("Start Date: " + startdate);
      eventDiv.append(p, g, s);

      $("#events-div").append(eventDiv);

    }

  };

  function restaurantButton(arrayRest) {
    $("#button-view").empty();
    for (var i = 0; i < arrayRest.length; i++) {
      var newbutton = $("<button>");
      newbutton.addClass("btn btn-md btn-danger btn-block");
      newbutton.text(arrayRest[i].name);
      newbutton.attr("href", arrayRest[i].url);
      newbutton.attr("target", "_blank");
      newbutton.attr("id", "button")
      $("#button-view").append(newbutton);
    }
  }

  function eventLinkButton(array) {
    for (var i = 0; i < array.length; i++) {
      var newbutton = $("<a>");
      newbutton.addClass("btn btn-md btn-danger btn-block");
      newbutton.text("GET TICKETS!");
      newbutton.attr("href", array[i].ticketURL);
      newbutton.attr("target", "_blank");
      newbutton.attr("id", "button")
      $("#events-div").append(newbutton);
    }
  }


  function clear() {
    $("#events-div").empty();
    $("#zip").val("");
  }

  $("#clearInput").on("click", clear);
});