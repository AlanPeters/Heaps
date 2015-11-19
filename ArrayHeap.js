//ArrayHeap


function heap(compare){
    this.comp = compare || function(a, b){ return a < b };
    this.array = [];
    this.tail = -1;
}

heap.prototype.insert = function(value){
    this.tail++;
    this.array[this.tail] = value;
    var i = this.tail;
    var paren = Math.ceil(i/2)-1;
    while(i > 0 && this.comp(this.array[i],this.array[paren])){
        this.array[i] = this.array[paren];
        this.array[paren] = value;
        i = paren;
        paren = Math.ceil(paren/2)-1;
    }
}

heap.prototype.delete = function(){
    if(this.tail === -1){
        return undefined;
    }
    var retValue = this.array[0];
    this.array[0] = this.array[this.tail];
    var temp = this.array[0];
    this.tail--;
    var i = 0;
    while(true){
        var left = (i+1)*2-1;
        var right = left+1;
        if(left <= this.tail && !this.comp(this.array[i],this.array[left])){
            this.array[i] = this.array[left];
            this.array[left] = temp;
            i = left;
        }else if(right <= this.tail && !this.comp(this.array[i],this.array[right])){
             this.array[i] = this.array[right];
             this.array[right] = temp;
             i = right;
        }else {
            return retValue;
        }
    }
}

module.exports = heap;



