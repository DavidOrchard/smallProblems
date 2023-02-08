/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

/* https://leetcode.com/explore/learn/card/recursion-ii/503/recursion-to-iteration/2774/ */
var inorderTraversal = function(root) {
    const nodes = [];
    const results = [];
    let curr = root;
    while (nodes.length >0 || curr) {
        while(curr) {
            nodes.push(curr);
            curr = curr.left;
        }
        curr = nodes.pop();
        results.push(curr.val);
        curr = curr.right;
    }
    return results;
};