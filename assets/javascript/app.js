var pokeArray = ["squirtle", "charmander", "bulbasaur", "Mewtwo"];

// displayPokeInfo function re-renders the HTML to display the appropriate content
function displayPokeInfo() {

  var pokemon = $(this).attr("data-name");
  var querygiphyURL = "https://api.giphy.com/v1/gifs/search?q=" +
    pokemon + "&api_key=WFFQT7BY2uL5ecZ9QSsHJu42oHz2Ptrq&limit=10";

  // giphyAJAX get call for pokemon buttons being clicked
  $.ajax({
    url: querygiphyURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(querygiphyURL);

    console.log(response.data);

    var results = response.data;

    // for later use for active viewer
    // var imgURLmain = results[0].images.fixed_height_still.url;
    // var imgURLstillmain = results[0].images.fixed_height_still.url;
    // var imgURLanimatemain = results[0].images.fixed_height.url;
    // var mainImage = $("<img>").attr("src", imgURLmain).attr("data-still", imgURLstillmain).attr("data-animate", imgURLanimatemain).attr("data-state", "still").addClass("gif");

    for (var i = 0; i < results.length; i++) {
      // Create a div to hold the gif
      var pokemonDiv = $("<div class='pokemonGif'>");

      // get the URL for the static gif
      var imgURL = results[i].images.fixed_height_still.url;
      var imgURLstill = results[i].images.fixed_height_still.url;
      var imgURLanimate = results[i].images.fixed_height.url;

      // Create an element to hold the image
      var image = $("<img>").attr("src", imgURL).attr("data-still", imgURLstill).attr("data-animate", imgURLanimate).attr("data-state", "still").addClass("gif");
      console.log(image);

      // Appending the static gif to the div
      pokemonDiv.append(image);

      // Putting the newest search in front of the previous
      $("#pokeDexGif").prepend(pokemonDiv);
    }
    $(".mainViewScreen").append(mainImage);

    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });



  });

};


// Function creating buttons from our pokeArray
function renderButtons() {

  // Deleting the pokemon search before adding new search
  $("#topicButtons").empty();

  // Loop through the array of pokemon
  for (var i = 0; i < pokeArray.length; i++) {

    var a = $("<button>");
    // Adding a class of pokemon-btn to our button
    a.addClass("pokemon-btn");
    // Adding a data-attribute
    a.attr("data-name", pokeArray[i]);
    // Providing the initial button text
    a.text(pokeArray[i]);
    // Adding the button to the buttons-view div
    $("#topicButtons").append(a);
  }
}

// This events triggers when an add-pokemon button is clicked
$("#add-pokemon").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var pokemon = $("#pokemon-input").val().trim();

  // Adding text from the textbox to our array
  pokeArray.push(pokemon);

  renderButtons();
});


// Adding a click event listener to all elements with a class of pokemon-btn"
$(document).on("click", ".pokemon-btn", displayPokeInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();