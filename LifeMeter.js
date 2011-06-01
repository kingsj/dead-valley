define(['game'], function (game) {

  var totalContainers = 3;
  var width, leftHalf, rightHalf;

  var $life = $('#life')

  var $heart          = $("<div>&hearts;</div>").addClass('heart');

  var fullHeart = function () {
    return $heart.clone().addClass('full');
  };

  var emptyHeart = function () {
    return $heart.clone().addClass('empty');
  };

  var leftHeart = function () {
    return $heart.clone().addClass('left-half').width(leftHalf);
  };

  var rightHeart = function () {
    // give the full part of the half heart the extra pixel
    return $heart.clone().addClass('right-half').width(rightHalf);
  };

  // determine width
  $life.append($heart);
  width     = $heart.width();
  if (width % 2 === 1) { // odd
    // give the left half the extra pixel
    leftHalf  = Math.round(width / 2);
    rightHalf = leftHalf - 1;
  } else { // even
    leftHalf  = width / 2;
    rightHalf = leftHalf;
  }

  $heart.remove();
  $life.width(width * totalContainers);

  var render = function (life) {
    $life.empty();
    var i;
    var fullCount  = Math.floor(life / 2);
    var halfCount  = life % 2;
    var emptyCount = totalContainers - fullCount - halfCount;
    for (i = 0; i < fullCount; i++) {
      $life.append(fullHeart());
    }
    if (halfCount) {
      $life.append(leftHeart());
      $life.append(rightHeart());
    }
    for (i = 0; i < emptyCount; i++) {
      $life.append(emptyHeart());
    }
  };

  var counter = 6;
  window.setInterval(function () {
    render(counter);
    counter--;
    if (counter < 0) {
      counter = 6;
    }
  }, 1000);

  return {
  };
});
