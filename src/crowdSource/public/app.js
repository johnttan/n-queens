// console.log('loaded');
// var doneWork = 0;
// var start = new Date();
// // var cb = function(total){
// //   var end = new Date();
// //   console.log('callback got it', total);
// //   console.log('finished in', end - start);
// // };

// var solveParallel = function(n, left, col, right, cb){
//   console.log('starting');
//   console.time('PARALLEL');
//   var all = Math.pow(2, n) - 1;
//   var TOTALCOUNT = 0;
//   var subR = function(leftDiag, cols, rightDiag){
//     var poss = ~(leftDiag | cols | rightDiag) & all;
//     while(poss > 0){
//       var bit = poss & -poss;
//       poss -= bit;
//       var newWork = new Parallel([(leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1, n], {env:{count:0}, maxWorkers: 4});
//       newWork.spawn(function(data){
//         var all = Math.pow(2, data[3]) - 1;
//         var leftDiag = data[0];
//         var cols = data[1];
//         var rightDiag = data[2];
//         var subR = function(leftDiag, cols, rightDiag){
//           if(cols === all){
//             global.env.count += 1;
//             return;
//           }
//           var poss = ~(leftDiag | cols | rightDiag) & all;
//           while(poss > 0){
//             var bit = poss & -poss;
//             poss -= bit;
//             subR((leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1);
//           }
//         };
//         subR(leftDiag, cols, rightDiag);
//         return global.env.count;
//       }).then(function(data){
//         TOTALCOUNT += data;
//         // console.log('IM DONE', TOTALCOUNT, data)
//         doneWork += 1;
//         if(doneWork === n){
//           console.timeEnd('PARALLEL');
//           console.log(TOTALCOUNT);
//           cb(TOTALCOUNT);
//         }
//       });
//     }
//   };
//   subR(left, right, col);
//   return TOTALCOUNT;
// };

var solveBitwise = function(n, left, col, right){
  var all = Math.pow(2, n) - 1;
  var count = 0;
  var subR = function(leftDiag, cols, rightDiag, cb){
    if(cols === all){
      count += 1;
      return;
    }
    var poss = ~(leftDiag | cols | rightDiag) & all;
    while(poss > 0){
      var bit = poss & -poss;
      poss -= bit;
      subR((leftDiag | bit) << 1, cols | bit, (rightDiag | bit) >> 1, cb);
    }
  };
  console.time('bitwise');
  subR(left, col, right);
  console.timeEnd('bitwise');
  return count;
};

var cb = function(solved){
  console.log('called');
  console.log(solved);
  $.post('/solution', {'solution':solved}, function(status){
    console.log('success', status);
    console.log('getting new problem');
    getData();
  });
};

var getData = function(){
  $.get('/data', function(data){
    console.log('got new problem', data);
    console.log(data[0], data[1], data[2], data[3]);

    cb(solveBitwise(data[0], data[1], data[2], data[3]));
  });
};

getData();
