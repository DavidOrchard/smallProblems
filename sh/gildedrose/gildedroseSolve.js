var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class UpdatableItem extends Item {
  updateQuality() {
    this.sellIn -= 1;
    this.quality -= (this.sellIn < 0 ? 2 : 1);
    this.checkQuality();
  }
  checkQuality() {
    if(this.quality < 0 ) this.quality = 0;
    if(this.quality > 50 ) this.quality = 50;
  }
}

class AgedBrie extends UpdatableItem {
  updateQuality() {
    this.sellIn -= 1;
    this.quality += 1;
    this.checkQuality();
  }
}

class Backstage extends UpdatableItem {
  updateQuality() {
    this.sellIn -= 1;
    this.quality = this.sellIn < 0 ? 0 : this.sellIn < 5 ? this.quality + 3 : this.sellIn < 10 ? this.quality + 2 : this.quality + 1;
    this.checkQuality();
  }
}
class Sulfuras extends UpdatableItem {
  updateQuality() {
    return;
  }
}

// - "Conjured" items degrade in Quality twice as fast as normal items

class Conjured extends UpdatableItem {
  updateQuality() {
    this.sellIn -= 1;
    this.quality = this.quality - (this.sellIn < 0 ? 4 : 2);
    this.checkQuality();
  }
}
class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality();
      return;
    }

    return this.items;
  }
}

// module.exports = {
//   Item,
//   Shop
// }

describe('Test suite', function() {
  const tests = [
      {
        args: [["foo", 1, 1]],
        expected:[{name: "foo", sellIn: 0, quality: 0}],
        days: 1
      },
      {
        args: [["foo", 1, 1]],
        expected:[{name: "foo", sellIn: -1, quality: 0}],
        days: 2
      },
      {
        args: [["Aged Brie", 3, 47]],
        expected: [{name: "Aged Brie", sellIn: 0, quality:50 }],
        days: 3
      },
      {
        args: [["Sulfuras, Hand of Ragnaros", 2, 25]],
        expected: [{name: "Sulfuras, Hand of Ragnaros", sellIn: 2, quality: 25}],
        days: 3
      },
      {
        args: [['Backstage passes to a TAFKAL80ETC concert', 6, 20]],
        expected: [{name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 5, quality: 22}],
        days: 1
      },
      {
        args: [['Backstage passes to a TAFKAL80ETC concert', 6, 20]],
        expected: [{name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: -1, quality: 0}],
        days: 7
      },
      {
        args: [['Conjured', 2, 3]],
        expected: [{name: 'Conjured', sellIn: 0, quality: 0}],
        days: 2
      }
  ];

  const nameToClass = (name) => {
    const mapped = {
      "Aged Brie": AgedBrie,
      "Sulfuras, Hand of Ragnaros": Sulfuras,
      'Backstage passes to a TAFKAL80ETC concert': Backstage,
      'Conjured': Conjured,
    }
    return mapped[name] || UpdatableItem
  };

  tests.forEach(({args, expected, days}, index) => 
      it(`check ${index} test case`, function () {
        const items = args.map((arg) => {
          const ClassName = nameToClass(arg[0]);
          return new ClassName(...arg);
        });
        const shop = new Shop(items);
        [...Array(days)].map(() => shop.updateQuality());
        assert.deepEqual(shop.items, expected);
      })
  );
}),

mocha.run();
