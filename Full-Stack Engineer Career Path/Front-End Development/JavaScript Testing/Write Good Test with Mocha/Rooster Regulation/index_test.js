const assert = require('assert');
const Rooster = require('../index');

describe('Rooster', ()=> {
  describe('.announceDawn', ()=>{
    it ('returns a rooster call', ()=> {
      //setup
      const expected = 'cock-a-doodle-doo!';
      //excerse
      const actual = Rooster.announceDawn();
      //verify
      assert.equal(actual, expected);
    })
  })
  describe('.timeAtDawn', ()=>{
    it('returns its argument as a string', ()=>{
      //setup
      const inputNumber = 12;
      const expected = '12';
      //exercise
      const actual = Rooster.timeAtDawn(inputNumber);
      //verify
      assert.strictEqual(actual, expected);
    })
    it('throws an error if passed a number less than 0', ()=> {
      //setup
      const inputNumber = -1;
      const expected = RangeError;
      //exercise & verify
      assert.throws(()=>{
        Rooster.timeAtDawn(inputNumber)}, expected
        );
    })
    it('throws an error if passed a number greater than 23', ()=> {
      //setup
      const inputNumber = 24;
      const expected = RangeError;
      //exercise & verify
      assert.throws(()=>{
        Rooster.timeAtDawn(inputNumber)}, expected
        );
    })
  })
})
