/* eslint-disable no-undef */
console.log("composer char counter loaded");

// eslint-disable-next-line no-undef
$(document).ready(function() {
  let tweet = document.getElementById("tweet-text");

  $('#tweet-text').on("keypress", function(event) {
    console.log($(this).val().length);
    let tweetLength = $(this).val().length;
    let counter = $(this).parent().next("div").children(".counter");
    let remainChars = 140 - tweetLength;
    counter.text(remainChars);
    // counter.addClass("name", value);
    if (remainChars < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });
  // tweet.addEventListener("keyup", (event) => {
  //   let text = this.getElementById("tweet-text");
  //   console.log(text);
  // });
});