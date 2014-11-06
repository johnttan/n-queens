var Parallel = require('paralleljs');
var doneWork = 0;
var start = new Date();
// var cb = function(total){
//   var end = new Date();
//   console.log('callback got it', total);
//   console.log('finished in', end - start);
// };

var solveParallel = function(n, cb){
  console.log('starting');
  console.time('PARALLEL');
  var all = Math.pow(2, n) - 1;
  var TOTALCOUNT = 0;
  var subR = function(leftDiag, cols, rightDiag){
    var poss = ~(leftDiag | cols | rightDiag) & all;
    while(poss > 0){
      var bit = poss & -poss;
      poss -= bit;
      var newWork = new Parallel([(leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1, n, 0], {env:{count:0}, maxWorkers: 4});
      newWork.spawn(function(data){
        global.env = {};
        global.env.count = data[4];
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
        // console.log('IM DONE', TOTALCOUNT, data)
        doneWork += 1;
        if(doneWork === n){
          console.timeEnd('PARALLEL');
          cb(TOTALCOUNT);
        }
      });
    }
  };
  subR(0, 0, 0);
  return TOTALCOUNT;
};


solveParallel(4, function(total){
  console.log(total);
});
