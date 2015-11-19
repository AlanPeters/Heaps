//DynamicHeap

function DynamicHeap(compare){
    this.comp = compare || function(a, b){ return a < b };
    this.root = {};
    this.n = 0;
}

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
            if(this.floatup(path, newNode, currentRoot.right)) return true;
            compareBranch = currentRoot.right;
        }
    }
    console.log(currentRoot.value+":"+compareBranch.value);
    if(!this.comp(currentRoot.value, compareBranch.value)){
        console.log("Switching:" +newNode.value);
        var temp = compareBranch.value;
        compareBranch.value = currentRoot.value;
        currentRoot.value = temp;

        return false;
    }else{
         return true;   //is done floating
    }

}

DynamicHeap.prototype.getPath = function(n){
    //var n = this.n;
    var path = [];
    while(n>1){
        path.push(n & 1);
        n = n >> 1;
    }
    return path;
}


module.exports = DynamicHeap;
