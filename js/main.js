const findCards = function () {
  const apiURL = "https://tarot.howlcode.com/spreads/three_cards";

  $.getJSON(apiURL, {

  }).done(showCard)
};

const showCard = function (results) {
  // Resetting orientation of cards
  $('.present').removeClass('flip');
  $('.past').removeClass('flip');
  $('.future').removeClass('flip');

  // To simulate upright and reversed cards
  let randomiser1 = "";
  let randomiser2 = "";
  let randomiser3 = "";
  let cardPosition1 = "";
  let cardPosition2 = "";
  let cardPosition3 = "";

  randomiser1 = _.random(1, 2);
  if (randomiser1 === 1) {
    cardPosition1 = "upright";
  } else {
   cardPosition1 = "reversed";
  };

  randomiser2 = _.random(1, 2);
  if (randomiser2 === 1) {
    cardPosition2 = "upright";
  } else {
   cardPosition2 = "reversed";
  };

  randomiser3 = _.random(1, 2);
  if (randomiser3 === 1) {
    cardPosition3 = "upright";
  } else {
   cardPosition3 = "reversed";
  };

  let pastURL = results[0].face_image_url;
  const $pastCardImage = $('<img />').attr({"src": pastURL, "class": "card-image"});
  $('.past').attr({"src": pastURL});
    if (cardPosition1 === "reversed") {
      $('.past').addClass('flip');
        };

  let presentURL = results[1].face_image_url;
  let $presentCardImage = $('<img />').attr({"src": presentURL, "class": "card-image"});
  $('.present').attr({"src": presentURL});
    if (cardPosition2 === "reversed") {
      $('.present').addClass('flip');
    };

  let futureURL = results[2].face_image_url;
  let $futureCardImage = $('<img />').attr({"src": futureURL, "class": "card-image"});
  $('.future').attr({"src": futureURL});
    if (cardPosition3 === "reversed") {
      $('.future').addClass('flip');
    };

  let $pastReading = results[0].short_meaning;
  $('#past-reading').empty().append($pastReading);
  let $keywords1;
  if (cardPosition1 === "reversed") {
    $keywords1 = results[0].reverse;
    $('#past-reading').append(` <br><br>Your card is in <b>reverse</b>. This suggests: ${$keywords1}.`);
};

  let $presentReading = results[1].short_meaning;
  $('#present-reading').empty().append($presentReading);
  let $keywords2;
  if (cardPosition2 === "reversed") {
    $keywords2 = results[1].reverse;
    $('#present-reading').append(` <br><br>Your card is in <b>reverse</b>. This suggests: ${$keywords2}.`);
  };

  let $futureReading = results[2].short_meaning;
  $('#future-reading').empty().append($futureReading);
  if (cardPosition3 === "reversed") {
    $keywords3 = results[2].reverse;
    $('#future-reading').append(` <br><br>Your card is in <b>reverse</b>. This suggests:  ${$keywords3}.`);
  };

  $('.card').addClass('animated flipInY');

  setTimeout( function () {
    $('.card').removeClass('animated flipInY');
  }, 900);

};


const throttledFindCards = _.throttle(findCards, 6000);

$(document).ready( function () {

  $('#button').on('click', function () {

    throttledFindCards();

  });
});
