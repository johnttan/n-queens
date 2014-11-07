var solveBitwise = function(n){
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
      subR((leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1);
    }
  };
  console.time('bitwise');
  subR(0, 0, 0);
  console.timeEnd('bitwise');
  return count;
};
