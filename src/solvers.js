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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
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
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var recurse = function(rowInd, valids){

  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
