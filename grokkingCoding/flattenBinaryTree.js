/* https://www.educative.io/courses/grokking-coding-interview-patterns-javascript/7XmgmNqBREA
*/
class BinaryTreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
  
        // below data member is only used for printing
        this.printData = String(data);
  
        // below data members used only for some of the problems
        this.next = null;
        this.parent = null;
        this.count = 0;
    }
  }
  
  class BinaryTree {
    constructor(args) {
        if (args == null) {
            this.root = new BinaryTreeNode(null);
        } else if (args.length == 1) {
            this.root = new BinaryTreeNode(args[0]);
        } else if (args.length > 1) {
            this.root = null;
            for (var i = 0; i < args.length; i++) {
                var nodeData = args[i];
                this.insert(nodeData);
            }
        }
    }
  
    insert(d) {
        let pNew = new BinaryTreeNode(d);
        if (this.root == null) {
            this.root = pNew;
        } else {
            let parent = new BinaryTreeNode();
            parent = null;
            let pTemp = new BinaryTreeNode();
            pTemp = this.root;
            while (pTemp != null) {
                parent = pTemp;
                if (d <= pTemp.data) {
                    pTemp = pTemp.left;
                } else {
                    pTemp = pTemp.right;
                }
            }
            if (d <= parent.data) {
                parent.left = pNew;
                // pNew.parent = parent;
            } else {
                parent.right = pNew;
                // pNew.parent = parent;
            }
        }
    }
  
    findInBSTRec(node, nodeData) {
        if (node == null) {
            return null;
        }
        if (node.data == nodeData) {
            return node;
        } else if (node.data > nodeData) {
            return this.findInBSTRec(node.left, nodeData);
        } else {
            return this.findInBSTRec(node.right, nodeData);
        }
    }
  
    findInBST(nodeData) {
        return this.findInBSTRec(this.root, nodeData);
    }
  
    getSubTreeNodeCount(node) {
        if (node == null) {
            return 0;
        } else {
            return (
                1 +
                this.getSubTreeNodeCount(node.left) +
                this.getSubTreeNodeCount(node.right)
            );
        }
    }
  
    getTreeDeepCopyRec(node) {
        if (node != null) {
            let newNode = new BinaryTreeNode(node.data);
            newNode.left = this.getTreeDeepCopyRec(node.left);
            newNode.right = this.getTreeDeepCopyRec(node.right);
            return newNode;
        } else {
            return null;
        }
    }
  
    getTreeDeepCopy() {
        if (this.root == null) {
            return null;
        } else {
            var treeCopy = new BinaryTree();
            treeCopy.root = this.getTreeDeepCopyRec(this.root);
            return treeCopy;
        }
    }
  }
  
  function inOrderTraverse(node, prevNode) {
    if(!node) return prevNode;
    console.log('node val', node.data);
    if(prevNode) {
      console.log('assigning node', prevNode.data, 'to', node.data);
      prevNode.next = node;
    }
    if(node.left) {
      console.log('traverse left');
      prevNode = inOrderTraverse(node.left, node);
    } else {
      prevNode = node;
    }
    if (node.right) {
      console.log('traverse right');
        prevNode = inOrderTraverse(node.right, prevNode);
    }
    return prevNode;
  }
  
  function serializeList(root) {
    const nodeVal = [];
    let node = root;
    while(node) {
      nodeVal.push(node.data);
      node = node.next;
    }
    return nodeVal;
  }
  
  export function flattenTree(root) {
    inOrderTraverse(root);
    return serializeList(root);
  }
  
  function createAndFlattenTree(nodes) {
    console.log('rootLevelOrder', nodes);
    let root = new BinaryTree(nodes);
    return flattenTree(root.root);
  }
  // console.log('res', flattenTree([3,2,17,1]));
  console.log('res', createAndFlattenTree([3,2,17,1,4,19,5]));