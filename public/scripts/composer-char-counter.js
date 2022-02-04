/* eslint-disable no-undef */
console.log("composer char counter loaded");

// eslint-disable-next-line no-undef
$(document).ready(function() {
  //checks when a key has been released and calculates the value of the char counter
  $('#tweet-text').on("keyup", function(event) {
    
    console.log($(this).val().length);
    let tweetLength = $(this).val().length;
    let counter = $(this).parent().next("div").children(".counter");
    let remainChars = 140 - tweetLength;
    counter.text(remainChars);

    if (remainChars < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }

  });

});