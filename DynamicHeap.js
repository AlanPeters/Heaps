//DynamicHeap
//@Author Alan Peters
//@Date 11/17/2015
//Heap implemented in a dynamically linked binary tree

//Constructor. Takes a compare function which will accept 2 variables and return true or false.
//Returning True will indicate that the first value belongs above the second in the tree.
//False will indicate the two values should be switched. value a < value b is used if no function is
//specified.
function DynamicHeap(compare){
    this.comp = compare || function(a, b){ return a < b };
    this.root = {};
    this.n = 0;
}

//insert a new value into the heap
DynamicHeap.prototype.insert = function(value){
    var newNode = {};
    newNode.value = value;
    this.n++;
    if(this.n === 1){
        this.root = newNode;
        return;
    }
    var path = this.getPath(this.n);
    this.floatUp(path, newNode, this.root);
}

//Used by insert
DynamicHeap.prototype.floatUp = function(path, newNode, currentRoot){
    var decision = path.pop();
    var compareBranch;
    if(path.length === 0){
        compareBranch = newNode;
        if(!decision){   //0 for left; 1 for right
            currentRoot.left = newNode;
        }else{
            currentRoot.right = newNode;
        }
    }else{
        if(!decision) {
            if(this.floatUp(path, newNode, currentRoot.left)) return true;
            compareBranch = currentRoot.left;
        }
        else {
            if(this.floatUp(path, newNode, currentRoot.right)) return true;
            compareBranch = currentRoot.right;
        }
    }
    if(!this.comp(currentRoot.value, compareBranch.value)){
        var temp = compareBranch.value;
        compareBranch.value = currentRoot.value;
        currentRoot.value = temp;
        return false;
    }else{
         return true;   //is done floating
    }

}

//Returns the path 0 for left, 1 for right in an array for any node given its position n.
//Used by insert to find the next open location and delete to find the last full node.
DynamicHeap.prototype.getPath = function(n){
    var path = [];
    while(n>1){
        path.push(n & 1);
        n = n >> 1;
    }
    return path;
}

//deletes the root node then swaps the last full node into the root position.
//Returns the deleted value.
DynamicHeap.prototype.delete = function(){
    if(this.root === undefined) return undefined;
    var retValue = this.root.value;
    if(this.n === 1 ){
         delete this.head;
         this.n--;
         return retValue;
    }
    var path = this.getPath(this.n);
    var currentParent = this.root;
    var currentNode = this.root;
    while(path.length > 0){
         var decision = path.pop();
         currentParent = currentNode;
         if(!decision){
             currentNode = currentNode.left;
         }else{
             currentNode = currentNode.right;
         }
    }
    this.root.value = currentNode.value;
    if(currentParent.right === undefined){
        delete currentParent.left;
    }else{
        delete currentParent.right;
    }
    this.n--;
    this.sinkDown(this.root);
    return retValue;
}

//used by delete to move the new root into its proper location.
DynamicHeap.prototype.sinkDown = function(root){
    if(root.left === undefined){  // if left is empty right will also be empty.
        return;
    }
    if(!this.comp(root.value, root.left.value)){
        var temp = root.value;
        root.value = root.left.value;
        root.left.value = temp;
        return this.sinkDown(root.left);
    }
    if(root.right === undefined){
         return;
    }
    if(!this.comp(root.value, root.right.value)){
        var temp = root.value;
        root.value = root.right.value;
        root.right.value = temp;
        return this.sinkDown(root.right);
    }
}

module.exports = DynamicHeap;
