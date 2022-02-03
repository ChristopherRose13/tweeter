/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};
let data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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


const createTweetElement = function(tweetData) {
  const now = timeago.format(tweetData.created_at);
  const $tweet = $(`      
  <article>
  <header>
    <div class="profile">
      <img src="${tweetData.user.avatars}">
      <h5>${tweetData.user.name}</h5>
    </div>
    <h5 id="tag">${tweetData.user.handle}</h5>
  </header>
  <div id="tweetBody">
    <p>${tweetData.content.text}</p>
  </div>
  <footer>
    <small>${timeago.format(tweetData.created_at)}</small>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </div>
  </footer>
  </article>`);

  return $tweet;
};

const loadTweets = function() {
  $.getJSON("/tweets", function(data) {

    renderTweets(data);
    // $.each( data, function( key, val ) {
    //   items.push( "<li id='" + key + "'>" + val + "</li>" );
    // });
    // console.log(data);
  });
  
};

//const $tweet = createTweetElement(tweetData);
// eslint-disable-next-line no-undef
//$('.posted').append($tweet);

$(() => {
  loadTweets();
  $('.create-tweet').submit(function (event) {
    event.preventDefault();
    const inputData = $(this).serialize();
    $.post("/tweets", inputData, loadTweets());


  });
});
