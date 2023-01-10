var Mocha = require('mocha')
var assert = require('assert');
const { access } = require('fs');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

/*
Juan Hernandez is a Shopify merchant that owns a Pepper sauce shop
with five locations: Toronto, Vancouver, Montreal, Calgary and Halifax.
He also sells online and ships his sauces across the country from one
of his brick-and-mortar locations.

The pepper sauces he sells are:

Jalapeño (J)
Habanero (H)
Serrano (S)
The inventory count for each location looks like this:

City       J  H  S
Toronto    5  0  0
Vancouver  10  2  6
Montreal   3  5  5
Calgary    1  18  2
Halifax    28  2  12
Every time he gets an online order, he needs to figure out
which locations can fulfill that order. Write a function that
takes an order as input and outputs a list of locations which
have all the items in stock.

Example
Input : J:3. H:2 s:4
Output: Van, Mon, Hali

Input: H:7 S:1
Output: Cal

*/

const describe = (name: string, cb: Function) => {
  console.log(name);
  console.group();
  const ret = cb();
  console.groupEnd();
  return ret;
}

const it = (name: string, cb: Function) => {
  let ret;
  try {
     ret = cb();
    console.log(`✅ ${name}`);
  } catch (e) {
    console.warn(`❌ ${name}`);
    console.error(e);
  }
  return ret;
}

interface IObjectKeys {
  [key: string]: number;
};

interface Inventory extends IObjectKeys {
  J: number;
  H: number;
  S: number;
};


const inventory: Record<string, Inventory> = {
  Toronto: {J:5, H:0, S:0},
  Vancouver: {J:10, H:2, S:6},
  Montreal: {J:3, H:5, S:5},
  Calgary: {J:1, H:18, S:2},
  Halifax: {J:28, H:2, S:12}
}

const checkInventory = (order: Partial<Inventory>, inventory: Record<string, Inventory>) => 
  Object.entries(inventory).reduce((acc:string[], [city, availability]) => {
    let needed = Object.entries(order).length
    for (let [itemName, itemQty = 0] of Object.entries(order)) {
      if(availability?.[itemName] >= itemQty ) needed--;
    }
    if(needed === 0) {
      acc.push(city.substring(0,3));
    }
    return acc;
  }, []);

describe('Test suite', function() {
  it('check no items', function () {
    assert.equal(JSON.stringify(checkInventory({H:30}, inventory)), JSON.stringify([]));
  });
  it('check mega items', function () {
    assert.equal(JSON.stringify(checkInventory({H:7, S:1}, inventory)), JSON.stringify(["Cal"]));
  });
  it('check all items', function() {
    assert.equal(JSON.stringify(checkInventory({J:3, H:2, S:4}, inventory)), JSON.stringify(["Van", "Mon", "Hal"]));
  });
})

mocha.run();

