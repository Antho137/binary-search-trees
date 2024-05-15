class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    insert(value) {
        let newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }        

        let current = this.root;
        while(current) {
            if (value < current.val) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                } else {
                    current = current.left
                }
            } else if (value > current.val) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                } else {
                    current = current.right;
                }
            } else {
                break;
            }
        }
    }

    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeItem(node, value) {
        if (node === null) {
            return null;
        } else if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            // node has no children
            if (node.left === null && node.right === null) {
                return null;
            }
            // node has no left child
            if (node.left === null) {
                return node.right;
            }
            // node has no right child
            if (node.right === null) {
                return node.left;
            }

            // node has two children
            node.value = this.minNode(node.right);
            node.right = this.removeNode(node.right, node.value);
        }
        return node;
    }

    minNode(node) {
        let minValue = node.value;
        while (node.left) {
            minValue = node.left.value;
            node = node.left;
        }
        return minValue;
    }

    find(value) {
        if (this.root === null) {
            return;
        }

        let node = this.root;
        while (node !== null) {
            if (value < node.data) {
                node = node.left;
            } else if (value > node.data) {
                node = node.right;
            } else if (value === node.data) {
                return node;
            }
        }
        return null;
    }

    levelOrder(callback) {
        const result = [];
        if (!this.root) return null;

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            if (callback) {
                callback(node);
            } else {
                result.push(node.val);
            }
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        return result;
    }

    inOrder(callback = null) {
        const result = [];
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                if (callback) {
                    callback(node.value);
                } else {
                    result.push(node.value);
                }
                traverse(node.right);
            }
        };
        traverse(this.root);
        return result;
    }

    preOrder(callback = null) {
        const result = [];
        const traverse = (node) => {
            if (node !== null) {
                if (callback) {
                    callback(node.value);
                } else {
                    result.push(node.value);
                }
                traverse(node.left);
                traverse(node.right);
            }
        };
        traverse(this.root);
        return result;
    }

    postOrder(callback) {
        const result = [];
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                if (callback) {
                    callback(node.value);
                } else {
                    result.push(node.value);
                }
            }
        };
        traverse(this.root);
        return result;
    }

    height(node = this.root) {
        if (!node) {
            return 0;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, current = tree.root) {
        if (current === null) {
            return null;
        }
        let edges = 0;
        while (current) {
            if (node.value < current.value) {
                current = current.left;
            } else if (node.value > current.value) {
                current = current.right;
            } else if (current.value === node.value) {
                return edges;
            }
            edges++;
        }
        return null;
    }

    isBalanced(node = this.root) {
        if (!node) return true;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    reBalance() {
        this.root = buildTree(this.inOrder());
    }
}

function buildTree(array) {
    if (!array.length) return null;

    array = Array.from(new Set(array.sort((a, b) => a - b)));

    function helper(start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = helper(start, mid - 1);
        node.right = helper(mid + 1, end);

        return node;
    }
    return helper(0, array.length - 1);
}

function getRandomNumbers(size) {
    const numbers = [];
    for (let i = 0; i < size; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}

const theBST = new Tree(getRandomNumbers(10));

console.log(theBST.inOrder());
console.log(theBST.preOrder());
console.log(theBST.postOrder());