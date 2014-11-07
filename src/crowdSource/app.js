var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Data problem stack


var generateProblems = function(n, depth){
  var problemStack = [];
  var all = Math.pow(2, n) - 1;

  var subR = function(leftDiag, cols, rightDiag, usrDepth){
    var poss = ~(leftDiag | cols | rightDiag) & all;
    while(poss > 0){
      var bit = poss & -poss;
      poss -= bit;
      if(usrDepth === depth){
        var problem = [n, (leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1];
        problemStack.push(problem);
      }else{
        subR((leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1, usrDepth+1);
      }
    }
  };
  subR(0, 0, 0, 0);
  return problemStack;
};

var n = 5;
var problems = generateProblems(n, 0);
console.log(problems.length, 'num of Subproblems');
app.get('/', function(req, res) {
  res.render('index');
});
app.get('/data', function(req, res){
  console.log('request for data')
  if(problems.length > 0){
    var problem = problems.shift();
    console.log('sending', problem)
    // problem = [4, 0, 0, 0];
    res.send(problem);
  }
  else{
    console.log('num of solutions', solved);
    res.send(404);
  }
});
var solved = 0;

app.post('/solution', function(req, res) {
  console.log('server received',req.body.solution);
  solved += parseInt(req.body.solution);
  res.send(200);
});

var server = app.listen(9199, function() {
	console.log('Express server listening on port ' + server.address().port);
});
