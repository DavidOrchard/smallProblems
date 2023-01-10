/* Write a function that takes input of arrays and loops over them to calculate
return values based on some criteria.
For example, take this array [['oranges', 1], ['apples', 2], ['grapes', 7]].
Based on this array return total costs if second array property is a quantity and product is
first array item. If say Oranges cost $5, and user buys the quantity of 2 or more, apply a 20% discount etc..
Return total cost from array by adding them all up.
*/
var purchases = [['oranges', 2], ['apples', 2], ['grapes', 7]];
var costs = {
    oranges: {
        cost: 5, discountMin: 2, discount: .2
    },
    apples: {
        cost: 2
    },
    grapes: {
        cost: 7
    }
};
var estimateTotal = function (cart) { return cart.reduce(function (acc, lineItem) {
    var type = lineItem[0], quantity = lineItem[1];
    var lineItemCosts = costs[type];
    if (!lineItemCosts)
        return acc;
    var cost = lineItemCosts.cost, discountMin = lineItemCosts.discountMin, discount = lineItemCosts.discount;
    var sub = cost * quantity;
    if (quantity >= discountMin) {
        sub *= 1 - discount;
    }
    return acc + sub;
}, 0); };
console.log('total', estimateTotal(purchases));
