/* Write a function that takes input of arrays and loops over them to calculate
return values based on some criteria.
For example, take this array [['oranges', 1], ['apples', 2], ['grapes', 7]].
Based on this array return total costs if second array property is a quantity and product is
first array item. If say Oranges cost $5, and user buys the quantity of 2 or more, apply a 20% discount etc..
Return total cost from array by adding them all up.
*/

type LineItem = [string, number];
const purchases: LineItem[] = [['oranges', 2], ['apples', 2], ['grapes', 7]];
const costs = {
    oranges: {
        cost: 5, discountMin: 2, discount: .2,
    },
    apples: {
        cost: 2,
    },
    grapes: {
        cost: 7
    }
};

const estimateTotal = (cart) => cart.reduce((acc, lineItem:LineItem) => {
        const [type, quantity] = lineItem;
        const lineItemCosts = costs[type];
        if (!lineItemCosts) return acc;
        const {cost, discountMin, discount} = lineItemCosts;
        let sub = cost * quantity;
        if (quantity >= discountMin) {
            sub *= 1 - discount;
        }
        return acc + sub;
    }, 0);

console.log('total', estimateTotal(purchases));

