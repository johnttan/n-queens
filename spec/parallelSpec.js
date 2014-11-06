describe('solversParallel', function() {

  describe('bitwise countNQueensSolutions(17)', function() {
    it('finds the number of valid solutions for n  = 17', function() {
      var solutionCount = solveBitwise(17);
      expect(solutionCount).to.be.equal(95815104);
    });

  });
  describe('parallel bitwise countNQueensSolutions(17)', function() {
    this.timeout(250000);

    it('finds the number of valid solutions for n = 17', function(done) {
      doneWork = 0;
      var cb = function(total){
        expect(total).to.be.equal(95815104);
        done();
      };
      var solutionCount = solveParallel(17, cb);
    });

  });

});
