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
    console.log(querygiphyURL);
    console.log(response.data);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      // Create a div to hold the gif
      var pokemonDiv = $("<div class='pokemonGif'>");

      // get the URL for the static gif
      var imgURL = results[i].images.fixed_height_still.url;
      var imgURLstill = results[i].images.fixed_height_still.url;
      var imgURLanimate = results[i].images.fixed_height.url;
      var rating = results[i].rating;
      // Create an element to hold the image
      var image = $("<img>").attr("src", imgURL).attr("data-still", imgURLstill).attr("data-animate", imgURLanimate).attr("data-state", "still").addClass("gif");


      // Appending the static gif to the div
      pokemonDiv.append(image).addClass("col-12");
      pokemonDiv.append("Rating: " + rating);
      // Putting the newest search in front of the previous
      $("#pokeDexGif").prepend(pokemonDiv);
    }
// on click function for gif startstop
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

function renderButtons() {
  // Deleting the pokemon search before adding new search
  $("#topicButtons").empty();
  // Loop through the array of pokemon
  for (var i = 0; i < pokeArray.length; i++) {
    var a = $("<button>");
    a.addClass("pokemon-btn");
    a.attr("data-name", pokeArray[i]);
    a.text(pokeArray[i]);
    $("#topicButtons").append(a);
  }
}

$("#add-pokemon").on("click", function (event) {
  event.preventDefault();
  var pokemon = $("#pokemon-input").val().trim();
  pokeArray.push(pokemon);
  renderButtons();
});

$(document).on("click", ".pokemon-btn", displayPokeInfo);

renderButtons();