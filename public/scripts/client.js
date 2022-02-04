/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//creates and renders an array of tweets
const renderTweets = function(tweets) {

  $('.posted').empty();
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.posted').prepend($tweet);
  }
  
};

//sanitizes user inputs and removes danegrous characters
const sanitize = function(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
};

//creates the html and values of a tweet
const createTweetElement = function(tweetData) {
  const now = timeago.format(tweetData.created_at);
  const $tweet = $(`      
  <article>
  <header>
    <div class="profile">` +
      `<img src="${sanitize(tweetData.user.avatars)}">
      <h5>${tweetData.user.name}</h5>
    </div>
    <h5 id="tag">${sanitize(tweetData.user.handle)}</h5>
  </header>
  <div id="tweetBody">
    <p>${sanitize(tweetData.content.text)}</p>
  </div>
  <footer>
    <small>${sanitize(timeago.format(tweetData.created_at))}</small>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </div>
  </footer>
  </article>`);


  return $tweet;
};

//loads the tweets that have been submitted to /tweets
const loadTweets = function() {
  $.getJSON("/tweets", function(data) {

    renderTweets(data);

  });
  
};

//validates that the tweet meets the specified requirements and returns an error message if not
const validateTweet = function(tweet) {
  const actualTweet = tweet.slice(5);
  console.log(actualTweet);
  if (!actualTweet) {
    $('#too-short').slideDown(500);
    return false;
  }

  if (actualTweet.length > 140) {
    $('#too-long').slideDown(500);
    return false;
  }
  return true;
};


//dynamically loads and creates tweets with valid user input
$(() => {
  loadTweets();
  $('.create-tweet').submit(function(event) {
    //cleans up error messages
    $('#too-short').slideUp(250);
    $('#too-long').slideUp(250);

    //prevents the input so we can serialize it and sanitize it first
    event.preventDefault();
    const inputData = $(this).serialize();
    if (!validateTweet(inputData)) {
      
      event.preventDefault();
    } else {
      $.post("/tweets", inputData, function () {
        //once the tweet has been added we reload and clear the text input and character counter
        loadTweets();
        $('#tweet-text').val("");
        $('.counter').val(140);
      });
      
    }

  });
});
