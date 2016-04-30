// start slingin' some d3 here.
(function() {
  
  var currScore = 0;
  var highScore = 0;
  var collisions = 0;
  var gameOver = false;

  var svg = d3.select('body').append('svg:svg');
  svg.attr('width', '500px')
     .attr('height', '500px')
     .style('background-color', 'black');

  var pattern = svg.selectAll('pattern')
     .data([1])
     .enter()
     .append('pattern')
     .attr('x', '0')
     .attr('y', '0')
     .attr('id', 'image')
     .attr('height', '50')
     .attr('width', '50');

  pattern.selectAll('image')
         .data([1])
         .enter()
         .append('svg:image')
         .attr('x', '0')
         .attr('y', '0')
         .attr('width', '38')
         .attr('height', '38')
         .attr('xlink:href', './sken.gif');


  var pattern2 = svg.selectAll('pattern')
     .data([1, 2])
     .enter()
     .append('pattern')
     .attr('x', '0')
     .attr('y', '0')
     .attr('id', 'image2')
     .attr('height', '50')
     .attr('width', '50');

  pattern2.selectAll('image')
         .data([1])
         .enter()
         .append('svg:image')
         .attr('x', '0')
         .attr('y', '0')
         .attr('width', '32')
         .attr('height', '32')
         .attr('xlink:href', './logo_face.png');


  var data = [100, 150, 200, 250, 300, 350, 400];
    
  var asteroid = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('svg:circle')
    .attr('class', 'asteroid')
    .attr('cx', function(d) {
      return d;
    })
    .attr('cy', function(d) {
      return d;
    })
    .attr('r', '15')
    .style('fill', 'url(#image)')
    .attr('class', 'spin');

  var drag = d3.behavior.drag()
    .on('drag', function() {
      if (d3.event.x < 500 && d3.event.y < 493 && d3.event.x > 0 && d3.event.y > 12) {
        player.attr('cx', d3.event.x)
            .attr('cy', d3.event.y);
      }
    });


  var player = svg.selectAll('.circle')
    .data([1])
    .enter()
    .append('svg:circle')
    .attr('class', '.circle')
    .attr('cx', '250')
    .attr('cy', '250')
    .attr('r', '15')
   // .attr('xlink:href', './rocket.jpg')
    .call(drag)
    //.style('fill', 'white');
    .style('fill', 'url(#image2)')
    .attr('stroke', 'white')
    .attr('stroke-width', '1.5');


  var scoreElement = d3.select('.spancurr')
    .data([1])
    .text(function(d) {
      return currScore;
    });

  var highScoreElement = d3.select('.spanhigh')
    .data([1])
    .text(function(d) {
      return highScore;
    });

  var collisionElement = d3.select('.collcurr')
    .data([1])
    .text(function(d) {
      return collisions;
    });    
  

  var move = function() {
    var astAtt = asteroid
      .transition()
      .duration(1200)
      .attr('cx', function(d) {
        var x = Math.random() * 500;
        return x;
      })
      .attr('cy', function(d) {
        var y = Math.random() * 500;
        return y;
      })
      .attr('r', '15')
      .tween('collision', collisionDetection)
      .each('end', move);

  };

  move();


  var collisionDetection = function() {
    return function() {
      var thisCircle = d3.select(this);
      d3.select('circle').each(function() {
        //var otherCircle = d3.select(this);
        var otherCircle = player;
        if (thisCircle.datum() !== otherCircle.datum()) {
          dx = thisCircle.attr('cx') - otherCircle.attr('cx'),
          dy = thisCircle.attr('cy') - otherCircle.attr('cy'),
          distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

          if (distance < Number(thisCircle.attr('r')) + Number(otherCircle.attr('r'))) {
            collision(thisCircle, otherCircle);
          }
        }
      });
    };
  };

  var collision = function(thisCircle, otherCircle) {
    gameOver = true;
    collisions += 1;
    collisionElement.text(collisions);
    console.log('Collision at: ' + thisCircle.attr('cx') + ',' + thisCircle.attr('cy'));
  };

  var gameStart = function() {
    var game = setInterval(function() {
      if (gameOver === false) {
        currScore += 1;
        scoreElement.text(currScore);
      } else {
        if (currScore > highScore) {
          highScore = currScore;
          //collisions += 1;
          //collisionElement.text(collisions);
          highScoreElement.text(highScore);
        }
        currScore = 0;
        gameOver = false;
      }
    }, 50);
  };

  gameStart();

})();



