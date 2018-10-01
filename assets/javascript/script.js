$(document).ready(function () {

  $("#userInput").on("click", function () {

    event.preventDefault();
    var zipcode = $("#zip").val().trim();
    console.log(zipcode);

  });

  //=====================================================
  //Mike Ryan's Code
  //=====================================================
  var eventsOut = [];

  function ticketMasterFetch(zip) {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=JK1bYROCje1BYtx3gGe1wVE6Z0kutcdA&postalCode="
    url += zip;
    var req = new XMLHttpRequest();
    req.onload = () => {
      var json = JSON.parse(req.responseText);
      var events = json._embedded.events;
      for (var i = 0; i < events.length; i++) {
        console.log(events[i]);
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
      }
      yelp(city);
    }
    req.open("GET", url, true);
    req.send();

  }

  function yelp(arg, arg2, arg3, arg4) {
    //make arguements optional
    //zip
    arg = arg || console.log("no zip");
    //location
    arg2 = arg2 || console.log("no location");
    //lat
    arg3 = ((arg3 || console.log("no lat")) && (arg4 || console.log("no lon")));
    //lon
    arg4 = ((arg4 || console.log("no lon")) && (arg3 || console.log("no lat")));

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
      console.log(response);
      let businessArr = response.businesses;

      let arrayRest = [];

      //loop the array from yelp, take the properties needed and add to a new object, and loop them all into a new array
      for (let i = 0; i < businessArr.length; i++) {
        let businessObject = businessArr[i];
        let indivRest = {};
        indivRest["alias"] = businessObject.alias;
        indivRest["rating"] = businessObject.rating;
        indivRest["url"] = businessObject.url;
        arrayRest.push(indivRest);
      };
      console.log(arrayRest);

    });

  };

  ticketMasterFetch("90012");

  function displayEvent(eventsOut) {

    for (i = 0; i < eventsOut.length; i++) {

      var city = eventsOut.city;

      var eventDiv = $("<div>");
      eventDiv.addClass("event");
      eventDiv.text("<h1>" + city + "<h1>");

      $("#info-div").append(eventDiv);

    }

  };

  displayEvent(eventsOut);


});