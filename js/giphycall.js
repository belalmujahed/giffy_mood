
//array of emotion names
const topics = ["funny", "happy", "sad","nervous",   "bored", "angry", "hopeful","annoyed", "sneaky", "lol","fear","bitter", "cool", "crazy","confused", "sleepy", "grumpy", "relaxed", "excited"];



function renderButtons() {
  $("#buttons-view").empty();

  // main function loop
  for (i = 0; i < topics.length; i++) {
      const buttonName = topics[i];
      const button = $("<button>").text(buttonName);
      button.attr("type", "button");
  button.attr("class","btn btn-md btn-info mr-2 ml-2 topic-btn");
  button.attr("data-name", buttonName);
  $("#buttons-view").append(button);    
    
  };
}

//ajax call when button clicked
function topicClicked(input) {

  //query url
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        input + "+&api_key=4HtqM9HnAM32N4dnJFxS3TzxBkXkYl6u&limit=50";

  console.log(queryURL);

  //AJAX call
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {

  console.log(response); //logs entire object including all 10 results


      const results = response.data;
      console.log(results); //this should log the array of 10 results
    
    // loop through each result item in results array
    for (i = 0; i < results.length; i++){

        //get still and animated version urls and store in variables
        const stillGif = results[i].images.fixed_height_still.url;
        const animatedGif = results[i].images.fixed_height.url;

        // create image element
        const imgOutput = $("<img>");

        // add source attribute (still version), classes, data-state
        imgOutput.attr("src", stillGif);
        imgOutput.attr("class","gif m-1 rounded").attr("data-state", "still");
        
        // add additional attributes data-still and data-animate such that it can toggle between the still and animated versions of the url- imitate the image attributes in the example at the bottom of the html file
        imgOutput.attr("data-still", stillGif);
        imgOutput.attr("data-animate", animatedGif);

        // append the img to #gifs-view div
        $("#gifs-view").append(imgOutput);

        //prepend the rating to the image
    }
  });
}

function toggleGifState() {

  //download and store variable
    const state = $(this).attr("data-state");
    const still = $(this).attr("data-still");
    const animate = $(this).attr("data-animate");

    if (state === "still") {
  $(this).attr("src", animate);
  $(this).attr("data-state","animate");
  }

  else if (state === "animate") {
    $(this).attr("src", still);
    $(this).attr("data-state","still");
  }

  else {
    $(this).attr("src", still);
    $(this).attr("data-state","still");
    console.log("toggleGifState function error - defaulted to still image- state is " + state);
  }

}


//start animating gif on click
$("#buttons-view").on("click", ".topic-btn", function() {
  //clear previous gifs from div before adding new ones
  $("#gifs-view").empty();
  const topic = $(this).attr("data-name");

    topicClicked(topic);
} );


$(document).on("click", ".gif", toggleGifState);

renderButtons();



