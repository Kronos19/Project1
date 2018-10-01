
// function ticketMasterFetch(zip) {
//   var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=JK1bYROCje1BYtx3gGe1wVE6Z0kutcdA&postalCode="
//   url += zip;
//   var req = new XMLHttpRequest();
//   req.onload = () => {
//     var json = JSON.parse(req.responseText);
//     var events = json._embedded.events;
//     var eventsOut = [];
//     for (var i = 0; i < events.length; i++) {
//       console.log(events[i]);
//       var name = events[i].name;
//       var segment = events[i].classifications[0].segment.name;
//       var genre = events[i].classifications[0].genre.name;
//       var venue = events[i]._embedded.venues[0].name;
//       var startDate = events[i].dates.start.localDate;
//       var startTime = events[i].dates.start.localTime;
//       var imageURL = events[i].images[1].url;
//       var ticketURL = events[i].url;
//       var coords = {
//         latitude: events[i]._embedded.venues[0].location.latitude,
//         longitude: events[i]._embedded.venues[0].location.longitude
//       }
//       var city = events[i]._embedded.venues[0].city.name;
//       var state = events[i]._embedded.venues[0].state.stateCode;
//       var eventObj = {name, segment, genre, venue, startDate, startTime,
//         imageURL, ticketURL, coords, city, state};
//       eventsOut.push(eventObj);
//     }
//     console.log(eventsOut);
//   }
//   req.open("GET", url, true);
//   req.send();

// }

// ticketMasterFetch('07728');

// function yelp(arg) {
//   //query api
//   let queryURL=  "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + arg + "&radius=8046&limit=10";
//   //corsURL issue code fix
//   var corsURL = "https://cors-anywhere.herokuapp.com/" + queryURL;
//   $.ajax({
//     url: corsURL,
//     method: "GET",
//     headers: {
//       //my API
//       'Authorization': "Bearer -fQflxBoof3K42D5NlSTEm1zb2Q4pYrNwqMIXOqoLAc2vw9W5KExghydPZmUeCQWOPFm5mRoQ9dYYIJHu1lz0_eTCuD0Aux8tZaVhM3XvD8x22mQaodNSGx5DVSuW3Yx"
//     }
//   }).then(function(response) {
//     console.log(response);
  
//   });
// };
// yelp("07920");


//=====================================================
//Mike Ryan's Code
//=====================================================
function ticketMasterFetch(zip) {
 var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=JK1bYROCje1BYtx3gGe1wVE6Z0kutcdA&postalCode="
 url += zip;
 var req = new XMLHttpRequest();
 req.onload = () => {
  var json = JSON.parse(req.responseText);
  console.log(json);
  console.log(json._embedded)
  var events = json._embedded.events;
  var eventsOut = [];
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
   var eventObj = {name, segment, genre, venue, startDate, startTime,
    imageURL, ticketURL, coords, city, state};
   eventsOut.push(eventObj);
  }
  console.log(eventsOut);
  yelp(city);
 }
 req.open("GET", url, true);
 req.send();
}
//=====================================================
//MY CODE
//=====================================================
function yelp(arg) {
 //query api
 let queryURL= "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + arg + "&radius=8046&limit=10";
 //corsURL issue code fix
 var corsURL = "https://cors-anywhere.herokuapp.com/" + queryURL;
 $.ajax({
  url: corsURL,
  method: "GET",
  headers: {
   //my API
   'Authorization': "Bearer -fQflxBoof3K42D5NlSTEm1zb2Q4pYrNwqMIXOqoLAc2vw9W5KExghydPZmUeCQWOPFm5mRoQ9dYYIJHu1lz0_eTCuD0Aux8tZaVhM3XvD8x22mQaodNSGx5DVSuW3Yx"
  }
 }).then(function(response) {
  console.log(response);
 });
};
ticketMasterFetch("90012");