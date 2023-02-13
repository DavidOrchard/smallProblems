// https://leetcode.com/problems/clone-graph/solutions/
/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

// was really stupid and used node.neighbours && instead of if so copied original
// then didn't check that visited was cleared after each run

function cloneGraph(node: Node | null): Node | null {
    let visited = {};

    function cloneGraph2(node: Node | null): Node | null {
        if(!node) return node;
        if(visited[node.val]) return visited[node.val];
        visited[node.val] = new Node(node.val, []);
        if(node.neighbors) visited[node.val].neighbors = node.neighbors.map(cloneGraph2);
        return visited[node.val];
    };
    return cloneGraph2(node);
};
