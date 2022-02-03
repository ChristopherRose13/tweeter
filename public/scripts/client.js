/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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

$(() => {
  loadTweets();
  $('.create-tweet').submit(function(event) {
    $('#too-short').slideUp(250);
    $('#too-long').slideUp(250);
    event.preventDefault();
    const inputData = $(this).serialize();
    if (!validateTweet(inputData)) {
      
      event.preventDefault();
    } else {
      $.post("/tweets", inputData, loadTweets());
      
    }
    loadTweets();
  });
});
