const { test } = require('picomatch');
const somaNuns=require('./soma');
const { default: expect } = require('expect');
test('soma de 10 e 7 deve ser igual a 17',()=>{
    expect(somaNuns(10,7)).toBe(17);
});