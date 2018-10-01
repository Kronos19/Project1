function yelp(arg, arg2, arg3, arg4) {
  //make arguements optional
   //zip
 arg = arg || console.log("no zip");
  //location
 arg2 = arg2 || console.log("no location");
  //lat
  arg3 = ((arg3 || console.log("no lat")) && (arg4 || console.log("no lon")));
  //lon
  arg4 = ((arg3 || console.log("no lat")) && (arg4 || console.log("no lon")));

   //query api
   let queryURL=  "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + arg + "&radius=8046&limit=10";
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

yelp("90012");

//can accept lat and lon as decimals, would need to parseflow from the ticket master API after getting out of object