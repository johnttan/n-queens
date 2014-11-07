console.log('loaded');
var start = new Date();
var solveParallel = function(n, left, col, right, cb){
  var workToDo = 0;
  console.log('starting');
  var all = Math.pow(2, n) - 1;
  var TOTALCOUNT = 0;
  var doneWork = 0;
  var subR = function(leftDiag, cols, rightDiag){
    var poss = ~(leftDiag | cols | rightDiag) & all;
    var secondPoss = poss;
    while(secondPoss > 0){
      var bit = secondPoss & -secondPoss;
      secondPoss -= bit;
      workToDo += 1;
    }
    console.log('workToDo:', workToDo);

    while(poss > 0){
      var bit = poss & -poss;
      poss -= bit;
      var newWork = new Parallel([(leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1, n], {env:{count:0}, maxWorkers: 4});
      newWork.spawn(function(data){
        var all = Math.pow(2, data[3]) - 1;
        var leftDiag = data[0];
        var cols = data[1];
        var rightDiag = data[2];
        var subR = function(leftDiag, cols, rightDiag){
          if(cols === all){
            global.env.count += 1;
            return;
          }
          var poss = ~(leftDiag | cols | rightDiag) & all;
          while(poss > 0){
            var bit = poss & -poss;
            poss -= bit;
            subR((leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1);
          }
        };
        subR(leftDiag, cols, rightDiag);
        return global.env.count;
      }).then(function(data){
        TOTALCOUNT += data;
        doneWork += 1;
        console.log('doneWork, workToDo', doneWork, workToDo);
        if(doneWork === workToDo){
          console.log(TOTALCOUNT, 'found solution');
          cb(TOTALCOUNT);
        }
      });
    }
  };
  subR(left, col, right);
  return TOTALCOUNT;
};

var cb = function(solved){
  console.log('callback invoked');
  $.post('/solution', {'solution':solved}, function(status){
    console.log('getting new problem');
    getData();
  });
};

var getData = function(){
  $.get('/data', function(data){
    console.log('got new problem', data);
    solveParallel(data[0], data[1], data[2], data[3], cb);
  });
};

getData();
