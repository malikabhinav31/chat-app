const expect=require("expect");

const {isRealString}=require('./validator');

describe('isRealString',()=>{
   it('only valid strings shall pass',()=>{
      expect(isRealString(123)).toBe(false);
	  expect(isRealString("    ")).toBe(false);
	  expect(isRealString("  abhinav")).toBe(true);
   });
});