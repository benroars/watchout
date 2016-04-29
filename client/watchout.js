// start slingin' some d3 here.
(function() {
  
  var currScore = 0;
  var highScore = 0;
  var gameOver = false;

  var svg = d3.select('body').append('svg:svg');

  svg.attr('width', '500px')
     .attr('height', '500px')
     .style('background-color', 'black');

  var data = [1, 2, 3, 4, 5];
    
  var asteroid = svg.selectAll('image')
    .data(data)
    .enter()
    .append('image')
    .attr('class', 'asteroid')
    .attr('height', '50px')
    .attr('width', '50px')
    .attr('xlink:href', './asteroid.png')
    .attr('x', function(d) {
      var x = Math.random() * 400;
      return x + 'px';
    })
    .attr('y', function(d) {
      var y = Math.random() * 400;
      return y + 'px';
    })
    .text(function(d) {
      return d;
    });

  var drag = d3.behavior.drag()
    .on('drag', function() {
      if(d3.event.x < 500 && d3.event.y < 493 && d3.event.x > 0 && d3.event.y > 12) {
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
    .style('fill', 'white');


  var scoreElement = d3.select('.spancurr')
    .data([1])
    .text(function(d) {
      return currScore;
    });
  
  setInterval(function() {
    asteroid.transition().duration(1200)

    .attr('x', function(d) {
      var x = Math.random() * 400;
      //console.log(this.x.baseVal.value);
      //console.log(this); 

      return x + 'px';
    })
    .attr('y', function(d) {
      var y = Math.random() * 400;
      return y + 'px';
    });

  }, 1500);



  var gameStart = function() {
    var game = setInterval(function() {
      if (gameOver === false) {
        currScore += 1;
        scoreElement.text(currScore);
      } else {
        if (currScore > highScore) {
          highScore = currScore;
          currScore = 0;
        }
      }
    }, 50);
  };

  var checkCollision = function() {

  };

  gameStart();

})();



