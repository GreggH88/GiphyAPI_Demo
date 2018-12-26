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

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      // Creating a div to hold the movie
      var pokemonDiv = $("<div class='pokemonGif'>");

      // Retrieving the URL for the image
      var imgURL = results[i].images.fixed_height_still.url;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      pokemonDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#pokeDexGif").prepend(pokemonDiv);
    }
  });

};

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#topicButtons").empty();

  // Looping through the array of movies
  for (var i = 0; i < pokeArray.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("pokemon-btn");
    // Adding a data-attribute
    a.attr("data-name", pokeArray[i]);
    // Providing the initial button text
    a.text(pokeArray[i]);
    // Adding the button to the buttons-view div
    $("#topicButtons").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-pokemon").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var pokemon = $("#pokemon-input").val().trim();

  // Adding movie from the textbox to our array
  pokeArray.push(pokemon);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".pokemon-btn", displayPokeInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();