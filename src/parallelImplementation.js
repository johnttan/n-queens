var workers = [];


var solve = function(n){
  var all = Math.pow(2, n) - 1;
  var count = 0;
  var subR = function(leftDiag, cols, rightDiag){
    if(cols === all){
      count += 1;
      return;
    }
    var poss = ~(leftDiag | cols | rightDiag) & all;
    while(poss > 0){
      var bit = poss & -poss;
      poss -= bit;
      var newWork = new Parallel([(leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1, n])
      newWork.spawn(function(data){
        var all = Math.pow(2, data[3]) - 1;
        var leftDiag = data[0];
        var cols = data[1];
        var rightDiag = data[2];
        var count = 0;
        var subR = function(leftDiag, cols, rightDiag){
          if(cols === all){
            count += 1;
          console.log(count)
            return;
          }
          var poss = ~(leftDiag | cols | rightDiag) & all;
          while(poss > 0){
            var bit = poss & -poss;
            poss -= bit;
            subR((leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1);
          }
        }
        subR(leftDiag, cols, rightDiag);
        // console.log(count)
        return count;
      }).then(function(data){
        count += data;
      })
    }
  }
  console.time('NQUEENS');
  subR(0, 0, 0)
  console.timeEnd('NQUEENS');
  console.log(count)
  return count;
}


solve(4)