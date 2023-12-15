var assert = require("assert");
var Calculate =  require('../index.js')

describe('Calculate', () => {
  describe('.factorial', () => {
    it('returns factorial product', ()=> {
      //setup
      const inputNum = 3
      const expectedResult = 6
      //exercise
      const actualResult = Calculate.factorial(inputNum)
      //verify
      assert.equal(actualResult, expectedResult)
    })

    it ('returns 1 when you pass in 0', ()=> {
      const inputNum = 0
      const expectedResult = 1
      //exercise
      const actualResult = Calculate.factorial(inputNum)
      //verify
      assert.equal(actualResult, expectedResult)
    })
  });
});
