//=====================================================
//MY CODE
//=====================================================


//either create wrapping if statement for each arg and give a,0,0,0 etc based off which var selected or have mike send the above mentioned in anoter form based on the data from TM

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
    // console.log(response);
    let businessArr = response.businesses;
    // console.log(objCall);
    // for(let i = 0; i <objCall; i++) {
    // let restaurantInfo = response.Object.businesses[i];
    // let restArr = [];
    // let restObj = {
    //     name: restaurantInfo.alias,
    //     rating: restaurantInfo.rating,
    //     link: restaurantInfo.url
    //   };
    //   restArr.push(restobj);
  //   //   console.log(restaurantCall);
// };

  // let arrayRest = [];
  // for (let i = 0; i < businessArr.length; i++) {
  //   // access multiple keys, alias, name, rating
  //   for(let j = 0; j <arrayRest; j++) {
  //   let indivRest = {};
  //   indivRest["alias"] = businessArr[i].alias;
  //   indivRest["rating"] = businessArr[i].rating;
  //   indivRest["url"] = businessArr[i].url;
  //   arrayRest.push(indivRest);
  //   delete indivRest.alias;
  //   delete indivRest.rating;
  //   delete indivRest.url;
  //   };
  // };
  // console.log(arrayRest);


  
  //iterative names for objects to be creates for the restaurants
//   let arrayName = [];
//   for (let i = 0; i <businessArr.length; ++i) {
//     let varName = "indivRest"; 
//     varName+=i;
//     arrayName.push(varName);
// }

// let arrayName[i] = {};



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

//can accept lat and lon as decimals, would need to parse from the ticket master API after getting out of object
