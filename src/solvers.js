/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  for(var i=0;i<n;i++){
    solution[i] = [];
    solution[i][i] = 1;
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

/*************** Slow solution *********************/
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n':n});
  var boardRep = board.rows();

  var recurse = function(rowInd, rookCols){
    for(var i = 0;i < n;i++){
      if(!rookCols[i]){
          if(rowInd < n-1){
            var rooks = JSON.parse(JSON.stringify(rookCols));
            rooks[i] = true;
            recurse(rowInd + 1, rooks);
          }else{
            solutionCount += 1;
            return;
          }
        }
    }
    return;
  }
  recurse(0, {});
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if(n===0){return []}
  var solutionCount = 0;
  var solutions = [];
  var valid = function(rowInd, i, valids){
    return !valids.major[i-rowInd] && !valids.minor[i+rowInd] && !valids.col[i];
  };
  var recurse = function(rowInd, valids, result){
    var originalV = valids;
    var originalResult = result;
    for(var i=0;i<n;i++){
      result = JSON.parse(JSON.stringify(originalResult));
      var isValid = valid(rowInd, i, valids);
      if(isValid){
        valids = JSON.parse(JSON.stringify(originalV));

        valids.col[i] = true;
        valids.major[i-rowInd] = true;
        valids.minor[i+rowInd] = true;

        result[rowInd] = [];
        result[rowInd][i] = 1;
        if(rowInd+1 < n){
          recurse(rowInd+1, JSON.parse(JSON.stringify(valids)), JSON.parse(JSON.stringify(result)));
        }else{
          solutionCount += 1;
          solutions.push(result);
        }
      }
    }
  };
  recurse(0, {major:{}, minor:{}, col:{}}, []);
  var returnSol = solutions[0];
  if(returnSol){
    _.each(returnSol, function(el){
      for(var i=0;i<n;i++){
        if(el[i] !== 1){
          el[i] = 0;
        }      
      }
    })
    return returnSol;
  }else{
    var temp = new Board({n:n});
    return temp.rows();
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if(n===0){return 1}
  var solutionCount = 0;
  var valid = function(rowInd, i, valids){
    return !valids.major[i-rowInd] && !valids.minor[i+rowInd] && !valids.col[i];
  };
  var recurse = function(rowInd, valids){
    var originalV = valids;
    for(var i=0;i<n;i++){
      var isValid = valid(rowInd, i, valids);
      if(isValid){
        valids = JSON.parse(JSON.stringify(originalV));
        valids.col[i] = true;
        valids.major[i-rowInd] = true;
        valids.minor[i+rowInd] = true;
        if(rowInd+1 < n){
          recurse(rowInd+1, JSON.parse(JSON.stringify(valids)));
        }else{
          solutionCount += 1;
        }
      }
    }
  };
  recurse(0, {major:{}, minor:{}, col:{}});
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
